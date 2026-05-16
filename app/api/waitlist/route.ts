import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
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
