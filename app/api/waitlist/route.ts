import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// Basic in-memory rate limiting
// Map of IP to request count and window start timestamp
const rateLimit = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute

  const record = rateLimit.get(ip);
  if (record) {
    if (now - record.timestamp < windowMs) {
      if (record.count >= 5) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a minute." },
          { status: 429 }
        );
      }
      record.count += 1;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  const body = await request.json().catch(() => null);
  const email: string = body?.email?.trim().toLowerCase() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const supabase = createServerClient();

  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source: body?.source ?? "landing_page" });

  if (error) {
    // Postgres unique_violation — already signed up
    if (error.code === "23505") {
      return NextResponse.json({ message: "You're already on the list! 🎉" });
    }
    console.error("Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "You're on the list! We'll be in touch before June 15." });
}
