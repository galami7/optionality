"use client";

import { useState } from "react";
import Link from "next/link";
import { daysBetween, fmt } from "@/lib/date-utils";

type Status = "none" | "employed" | "gaps";

type FormState = {
  eadDate: string;
  status: Status;
  jobStartDate: string;
};

type TrackerUrgency = "safe" | "warning" | "critical" | "terminated";

type Result = {
  daysUnemployed: number;
  daysRemaining: number;
  pct: number;
  eadStart: Date;
  urgency: TrackerUrgency;
  isSevere: boolean;
};

function computeResult(form: FormState): Result {
  const eadStart = new Date(form.eadDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let daysUnemployed: number;
  if (form.status === "none") {
    daysUnemployed = Math.max(0, daysBetween(eadStart, today));
  } else {
    const jobStart = new Date(form.jobStartDate + "T00:00:00");
    daysUnemployed = Math.max(0, daysBetween(eadStart, jobStart));
  }

  const pct = Math.min(100, (daysUnemployed / 90) * 100);
  const daysRemaining = Math.max(0, 90 - daysUnemployed);

  let urgency: TrackerUrgency;
  if (daysUnemployed >= 90) urgency = "terminated";
  else if (daysUnemployed >= 60) urgency = "critical";
  else if (daysUnemployed >= 30) urgency = "warning";
  else urgency = "safe";

  return { daysUnemployed, daysRemaining, pct, eadStart, urgency, isSevere: daysUnemployed >= 75 };
}

const urgencyMeta: Record<TrackerUrgency, { bar: string; badge: string; text: string; heading: string; message: string }> = {
  safe: {
    bar: "bg-[#22C55E]",
    badge: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30",
    text: "text-[#22C55E]",
    heading: "You're well within the window.",
    message: "Keep documenting your employment activity. The clock runs from your EAD start date regardless of when you received the card.",
  },
  warning: {
    bar: "bg-[#F59E0B]",
    badge: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    text: "text-[#F59E0B]",
    heading: "Start your job search now.",
    message: "You've used a third of your window. Prioritize active applications — every unemployed day counts cumulatively.",
  },
  critical: {
    bar: "bg-red-500",
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
    text: "text-red-400",
    heading: "Urgent — consult your DSO this week.",
    message: "You are in critical territory. Contact your DSO immediately and consider reaching out to a licensed immigration attorney.",
  },
  terminated: {
    bar: "bg-red-600",
    badge: "bg-red-600/10 text-red-400 border-red-600/30",
    text: "text-red-400",
    heading: "Your OPT may be terminated.",
    message: "At 90+ days of cumulative unemployment, OPT is automatically terminated by USCIS — no notice is sent. Contact an immigration attorney today.",
  },
};

export default function TrackerTool() {
  const [form, setForm] = useState<FormState>({ eadDate: "", status: "none", jobStartDate: "" });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.eadDate && (form.status !== "employed" || form.jobStartDate);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  const result = submitted ? computeResult(form) : null;
  const meta = result ? urgencyMeta[result.urgency] : null;

  return (
    <>
      {/* Input form */}
      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/[0.08] bg-[#0F1729] p-8 md:p-10 mb-10"
        >
          <h2 className="text-lg font-bold text-[#F8FAFC] mb-6">Enter your EAD details</h2>

          {/* EAD start date */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
              EAD card start date *
            </label>
            <input
              type="date"
              required
              value={form.eadDate}
              onChange={(e) => setForm((f) => ({ ...f, eadDate: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#162040] border border-white/[0.10] text-[#F8FAFC] text-sm focus:outline-none focus:border-[#22C55E]/50 [color-scheme:dark]"
            />
            <p className="text-xs text-[#475569] mt-2">
              This is the &ldquo;Card Valid From&rdquo; date printed on your EAD — not the date you received the card.
            </p>
          </div>

          {/* Employment status */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-3">
              Current employment status *
            </label>
            <div className="space-y-3">
              {([
                { val: "none", label: "I haven't started working yet" },
                { val: "employed", label: "I started a job on a specific date" },
                { val: "gaps", label: "I've had gaps in employment" },
              ] as { val: Status; label: string }[]).map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, status: val }))}
                  className={`w-full px-4 py-3 rounded-xl text-sm text-left border transition-colors ${
                    form.status === val
                      ? "border-[#22C55E]/50 bg-[#22C55E]/10 text-[#22C55E]"
                      : "border-white/[0.08] bg-[#162040] text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Job start date (conditional) */}
            {form.status === "employed" && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
                  Date you started working *
                </label>
                <input
                  type="date"
                  required
                  value={form.jobStartDate}
                  onChange={(e) => setForm((f) => ({ ...f, jobStartDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#162040] border border-white/[0.10] text-[#F8FAFC] text-sm focus:outline-none focus:border-[#22C55E]/50 [color-scheme:dark]"
                />
              </div>
            )}

            {/* Gaps escape hatch */}
            {form.status === "gaps" && (
              <div className="mt-4 p-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
                <p className="text-xs text-[#F59E0B] font-semibold mb-1">Full gap calculator — coming soon</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Multi-employer gap tracking is in development. For now, ask the AI Advisor — describe your employment history and it will help you estimate your standing.
                </p>
                <Link
                  href="/advisor"
                  className="inline-block mt-3 text-xs text-[#22C55E] hover:underline"
                >
                  Ask the AI Advisor →
                </Link>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit || form.status === "gaps"}
            className="w-full py-4 rounded-xl bg-[#22C55E] text-[#080D1A] font-bold text-base hover:bg-[#4ADE80] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#22C55E]/20"
          >
            Calculate my unemployment days →
          </button>
        </form>
      )}

      {/* Results */}
      {result && meta && (
        <div>
          {/* Summary header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-5 rounded-2xl border border-white/[0.08] bg-[#0F1729]">
            <div>
              <p className="text-xs text-[#64748B] uppercase tracking-wide font-semibold mb-0.5">Tracking since</p>
              <p className="text-lg font-bold text-[#F8FAFC]">{fmt(result.eadStart)}</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-lg border border-white/[0.10] text-[#94A3B8] text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              ← Edit details
            </button>
          </div>

          {/* Progress bar card */}
          <div className={`rounded-2xl border p-6 md:p-8 mb-6 ${
            result.urgency === "terminated" || result.urgency === "critical"
              ? "border-red-500/25 bg-red-500/5"
              : result.urgency === "warning"
              ? "border-[#F59E0B]/25 bg-[#F59E0B]/5"
              : "border-[#22C55E]/25 bg-[#22C55E]/5"
          }`}>
            {/* Urgency badge + heading */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${meta.badge}`}>
                {result.urgency === "terminated" ? "Terminated" : result.urgency === "critical" ? "Critical" : result.urgency === "warning" ? "Warning" : "On track"}
              </span>
              <p className={`text-sm font-semibold ${meta.text}`}>{meta.heading}</p>
            </div>

            {/* Day count */}
            <div className="flex items-end gap-6 mb-6">
              <div>
                <p className="text-5xl font-black text-[#F8FAFC]">{result.daysUnemployed}</p>
                <p className="text-xs text-[#64748B] mt-1">days unemployed</p>
              </div>
              {result.urgency !== "terminated" && (
                <div className="pb-1">
                  <p className="text-2xl font-bold text-[#94A3B8]">{result.daysRemaining}</p>
                  <p className="text-xs text-[#64748B] mt-1">days remaining</p>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="relative h-3 rounded-full bg-[#162040] overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all ${meta.bar} ${result.isSevere || result.urgency === "terminated" ? "animate-pulse" : ""}`}
                  style={{ width: `${result.pct}%` }}
                />
              </div>
              {/* Tick marks */}
              <div className="relative mt-1">
                {[30, 60, 90].map((day) => (
                  <span
                    key={day}
                    className="absolute text-[10px] text-[#475569] -translate-x-1/2"
                    style={{ left: `${(day / 90) * 100}%` }}
                  >
                    {day}d
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <p className="text-sm text-[#94A3B8] leading-relaxed">{meta.message}</p>
            </div>
          </div>

          {/* Severe override */}
          {result.isSevere && result.urgency !== "terminated" && (
            <div className="mb-6 p-5 rounded-2xl border border-red-500/30 bg-red-500/5">
              <p className="text-sm font-bold text-red-400 mb-2">STOP. Talk to an immigration attorney today.</p>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                At {result.daysUnemployed} days, you have {result.daysRemaining} days left. At 90, USCIS automatically terminates OPT without sending notice.
                Contact a licensed immigration attorney immediately — not after the weekend.
              </p>
            </div>
          )}

          {/* What counts note */}
          <div className="mb-8 p-5 rounded-2xl border border-white/[0.08] bg-[#0F1729]">
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">What counts as unemployment</p>
            <ul className="space-y-2 text-xs text-[#64748B] leading-relaxed">
              <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">✗</span> Interviewing / job searching</li>
              <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">✗</span> Volunteering or unpaid internships</li>
              <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">✗</span> Part-time work under 20 hours/week</li>
              <li className="flex gap-2"><span className="text-[#22C55E] flex-shrink-0">✓</span> Working 20+ hrs/week at a qualifying employer</li>
              <li className="flex gap-2"><span className="text-[#22C55E] flex-shrink-0">✓</span> Self-employment through your own LLC (with proper structure)</li>
            </ul>
          </div>

          {/* Bottom CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-6">
              <p className="text-sm font-semibold text-[#F8FAFC] mb-2">Get deadline reminders</p>
              <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
                We&apos;ll email you when you approach the 60 and 80-day marks — before it&apos;s urgent.
              </p>
              <Link
                href="/#waitlist"
                className="inline-block px-4 py-2 rounded-lg bg-[#22C55E] text-[#080D1A] text-sm font-semibold hover:bg-[#4ADE80] transition-colors"
              >
                Join the waitlist →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0F1729] p-6">
              <p className="text-sm font-semibold text-[#F8FAFC] mb-2">Have questions?</p>
              <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
                Ask the AI Advisor about your specific situation, or find an immigration attorney.
              </p>
              <Link
                href="/advisor"
                className="inline-block px-4 py-2 rounded-lg border border-white/[0.12] text-[#94A3B8] text-sm font-medium hover:text-white hover:border-white/20 transition-colors"
              >
                Ask the AI Advisor →
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#475569] text-center mt-8 leading-relaxed">
            This tool provides estimates based on standard OPT rules. Always confirm your status with your DSO and a licensed immigration attorney.
            OPTionality is not a law firm and does not provide legal advice.
          </p>
        </div>
      )}
    </>
  );
}
