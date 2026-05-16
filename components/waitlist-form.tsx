"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ source = "landing_page" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;

    setState("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    const data = await res.json();

    if (res.ok) {
      setState("success");
      setMessage(data.message ?? "You're on the list!");
      setEmail("");
    } else {
      setState("error");
      setMessage(data.error ?? "Something went wrong. Try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-center justify-center gap-3 py-3 px-5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 max-w-md mx-auto">
        <span className="text-[#22C55E] text-lg">✓</span>
        <p className="text-[#22C55E] text-sm font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 rounded-xl bg-[#0F1729] border border-white/[0.12] text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/30"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 rounded-xl bg-[#22C55E] text-[#080D1A] font-semibold text-sm hover:bg-[#4ADE80] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Joining…" : "Join waitlist →"}
        </button>
      </form>
      {state === "error" && (
        <p className="text-red-400 text-xs mt-2 text-center">{message}</p>
      )}
    </div>
  );
}
