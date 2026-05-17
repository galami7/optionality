"use client";

import { useState } from "react";
import Link from "next/link";
import { addDays, addMonths, fmt, daysUntil } from "@/lib/date-utils";
import { type Urgency, type Phase, urgencyConfig, phaseColors, phaseLabels } from "@/lib/opt-types";

// ─── Types ────────────────────────────────────────────────────────────────────

type Event = {
  id: string;
  date: Date;
  title: string;
  description: string;
  action: string;
  urgency: Urgency;
  phase: Phase;
};

type FormData = {
  gradMonth: string;
  gradYear: string;
  school: string;
  isStem: "yes" | "no" | "unsure";
  level: "bachelors" | "masters" | "phd" | "other";
};

// ─── Calculation ─────────────────────────────────────────────────────────────

function computeUrgency(date: Date): Urgency {
  const days = daysUntil(date);
  if (days < 0) return "past";
  if (days <= 21) return "critical";
  if (days <= 60) return "warning";
  if (days <= 120) return "safe";
  return "future";
}

function buildTimeline(data: FormData): Event[] {
  const grad = new Date(Number(data.gradYear), Number(data.gradMonth) - 1, 15);
  const optStart = grad; // assume graduation date as OPT start
  const optEnd = addMonths(optStart, 12);
  const stemEligible = data.isStem === "yes";

  const events: Event[] = [
    {
      id: "ois-window",
      date: addDays(grad, -90),
      title: "OIS application window opens",
      description:
        "Your school's International Student Office (OIS/DSO) can now process your OPT application. Request your OPT I-20 from them — this is the first step before USCIS.",
      action: "Email your DSO today to begin the OPT I-20 process.",
      urgency: computeUrgency(addDays(grad, -90)),
      phase: "prep",
    },
    {
      id: "ois-recommended",
      date: addDays(grad, -60),
      title: "Recommended OIS submission deadline",
      description:
        "OIS offices can take 2–4 weeks to issue your updated I-20. Filing by this date gives USCIS the most runway before your graduation.",
      action: "Submit all OIS documents (passport, I-20, photos) by this date.",
      urgency: computeUrgency(addDays(grad, -60)),
      phase: "prep",
    },
    {
      id: "ois-last-safe",
      date: addDays(grad, -30),
      title: "Last safe OIS submission",
      description:
        "Filing after this point risks USCIS receiving your I-765 too close to graduation, limiting your start date options.",
      action: "If you haven't submitted yet, do it today — no exceptions.",
      urgency: computeUrgency(addDays(grad, -30)),
      phase: "prep",
    },
    {
      id: "graduation",
      date: grad,
      title: "Graduation 🎓",
      description:
        "Your OPT can start on this date (the earliest allowable start) or up to 60 days after. You enter a 60-day grace period if you don't start OPT immediately.",
      action: "Confirm your OPT start date on your EAD card matches your plan.",
      urgency: "milestone",
      phase: "grace",
    },
    {
      id: "opt-start",
      date: optStart,
      title: "OPT begins — 90-day clock starts",
      description:
        "Your 12-month OPT authorization period begins. The 90-day unemployment clock also starts now — you may have up to 90 cumulative days without qualifying employment before your OPT terminates.",
      action:
        "Start documenting your employment: employer name, start date, hours/week, job function.",
      urgency: computeUrgency(optStart),
      phase: "opt",
    },
    {
      id: "unemployment-90",
      date: addDays(optStart, 90),
      title: "90-day unemployment limit",
      description:
        "If you accumulate 90 days of unemployment (days with no qualifying employment), your OPT is automatically terminated — no notice from USCIS. Being in the application process, interviewing, or unpaid work does NOT count as employment.",
      action: "Track every day of employment carefully. If approaching 90 days unemployed, consult an attorney immediately.",
      urgency: computeUrgency(addDays(optStart, 90)),
      phase: "opt",
    },
    {
      id: "opt-end",
      date: optEnd,
      title: stemEligible ? "Standard OPT expires — STEM begins" : "OPT expires",
      description: stemEligible
        ? "Your standard 12-month OPT ends. If your STEM extension application was filed before this date, you enter an automatic 180-day cap gap and can continue working."
        : "Your OPT period ends. You enter a 60-day grace period to depart the US, change status, or transfer to a new school.",
      action: stemEligible
        ? "Confirm your STEM extension I-765 was filed and receipt notice received."
        : "Have a post-OPT plan in place: H-1B sponsorship, change of status, or departure.",
      urgency: computeUrgency(optEnd),
      phase: "opt",
    },
  ];

  if (stemEligible) {
    events.push(
      {
        id: "stem-file-window",
        date: addDays(optEnd, -90),
        title: "File STEM OPT extension — window opens",
        description:
          "You can now file your STEM OPT extension (I-765) with USCIS. You must be employed at an E-Verify enrolled employer and have a signed I-983 Training Plan with your manager.",
        action:
          "Confirm your employer is E-Verify enrolled. Complete Form I-983 with your supervisor. File I-765 ASAP.",
        urgency: computeUrgency(addDays(optEnd, -90)),
        phase: "stem",
      },
      {
        id: "stem-cap-gap",
        date: optEnd,
        title: "STEM cap gap begins (if pending)",
        description:
          "If your STEM extension application is still pending at USCIS when your standard OPT expires, you automatically receive a 180-day cap gap — you can keep working legally.",
        action: "Do not stop working during the cap gap. Keep your I-797 receipt notice with you at all times.",
        urgency: computeUrgency(optEnd),
        phase: "stem",
      },
      {
        id: "stem-end",
        date: addMonths(optStart, 36),
        title: "STEM OPT expires",
        description:
          "Your full 36-month OPT window ends. You'll need H-1B sponsorship, another degree program, or departure by this date. The H-1B lottery typically happens 15 months before this.",
        action:
          "Start H-1B planning 18+ months before this date. Talk to your employer's immigration team early.",
        urgency: computeUrgency(addMonths(optStart, 36)),
        phase: "stem",
      }
    );
  }

  // Sort chronologically
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear + i - 1);

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimelineTool() {
  const [form, setForm] = useState<FormData>({
    gradMonth: "",
    gradYear: "",
    school: "",
    isStem: "unsure",
    level: "masters",
  });
  const [events, setEvents] = useState<Event[] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gradMonth || !form.gradYear) return;
    setEvents(buildTimeline(form));
    setSubmitted(true);
  }

  function handleReset() {
    setEvents(null);
    setSubmitted(false);
  }

  return (
    <>
      {/* Input form */}
      {!submitted && (
        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-white/[0.08] bg-[#161109] p-8 md:p-10 mb-10"
        >
          <h2 className="text-lg font-bold text-[#EDE0CC] mb-6">Tell us about your program</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* Graduation month */}
            <div>
              <label className="block text-xs font-semibold text-[#9E8B71] uppercase tracking-wide mb-2">
                Graduation month *
              </label>
              <select
                required
                value={form.gradMonth}
                onChange={(e) => update("gradMonth", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1E1812] border border-white/[0.10] text-[#EDE0CC] text-sm focus:outline-none focus:border-[#C9A96E]/50"
              >
                <option value="">Select month</option>
                {months.map((m, i) => (
                  <option key={m} value={String(i + 1)}>{m}</option>
                ))}
              </select>
            </div>

            {/* Graduation year */}
            <div>
              <label className="block text-xs font-semibold text-[#9E8B71] uppercase tracking-wide mb-2">
                Graduation year *
              </label>
              <select
                required
                value={form.gradYear}
                onChange={(e) => update("gradYear", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1E1812] border border-white/[0.10] text-[#EDE0CC] text-sm focus:outline-none focus:border-[#C9A96E]/50"
              >
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>

            {/* Degree level */}
            <div>
              <label className="block text-xs font-semibold text-[#9E8B71] uppercase tracking-wide mb-2">
                Degree level
              </label>
              <select
                value={form.level}
                onChange={(e) => update("level", e.target.value as FormData["level"])}
                className="w-full px-4 py-3 rounded-xl bg-[#1E1812] border border-white/[0.10] text-[#EDE0CC] text-sm focus:outline-none focus:border-[#C9A96E]/50"
              >
                <option value="bachelors">Bachelor&apos;s</option>
                <option value="masters">Master&apos;s / MBA</option>
                <option value="phd">PhD / Doctoral</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* School */}
            <div>
              <label className="block text-xs font-semibold text-[#9E8B71] uppercase tracking-wide mb-2">
                School <span className="font-normal text-[#6E5E48]">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Georgetown, Kellogg"
                value={form.school}
                onChange={(e) => update("school", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1E1812] border border-white/[0.10] text-[#EDE0CC] placeholder-[#504133] text-sm focus:outline-none focus:border-[#C9A96E]/50"
              />
            </div>
          </div>

          {/* STEM question */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-[#9E8B71] uppercase tracking-wide mb-3">
              Is your degree in a STEM field?{" "}
              <a
                href="https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A96E] font-normal normal-case hover:underline"
              >
                Check the DHS list ↗
              </a>
            </label>
            <div className="flex gap-3">
              {(["yes", "no", "unsure"] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => update("isStem", val)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors capitalize ${
                    form.isStem === val
                      ? "border-[#C9A96E]/50 bg-[#C9A96E]/10 text-[#C9A96E]"
                      : "border-white/[0.08] bg-[#1E1812] text-[#9E8B71] hover:text-[#EDE0CC]"
                  }`}
                >
                  {val === "unsure" ? "Not sure" : val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
            {form.isStem === "yes" && (
              <p className="text-xs text-[#C9A96E] mt-2">
                ✓ Your timeline will include STEM OPT extension dates (+24 months).
              </p>
            )}
            {form.isStem === "unsure" && (
              <p className="text-xs text-[#6E5E48] mt-2">
                We&apos;ll generate a standard 12-month OPT timeline. Check the DHS list above to confirm.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!form.gradMonth || !form.gradYear}
            className="w-full py-4 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-bold text-base hover:bg-[#D4B882] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#C9A96E]/20"
          >
            Generate my OPT timeline →
          </button>
        </form>
      )}

      {/* Timeline results */}
      {events && (
        <div>
          {/* Summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-5 rounded-2xl border border-white/[0.08] bg-[#161109]">
            <div>
              <p className="text-xs text-[#6E5E48] uppercase tracking-wide font-semibold mb-0.5">Your timeline</p>
              <p className="text-lg font-bold text-[#EDE0CC]">
                {months[Number(form.gradMonth) - 1]} {form.gradYear}
                {form.school ? ` · ${form.school}` : ""}
                {form.isStem === "yes" ? " · STEM eligible" : ""}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-white/[0.10] text-[#9E8B71] text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              ← Edit details
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-8">
            {(["critical", "warning", "safe", "future", "past", "milestone"] as Urgency[]).map((u) => (
              <div key={u} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${urgencyConfig[u].dot}`} />
                <span className={`text-xs px-2 py-0.5 rounded-full border ${urgencyConfig[u].badge}`}>
                  {urgencyConfig[u].label}
                </span>
              </div>
            ))}
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/[0.08]" aria-hidden />

            <div className="space-y-0">
              {events.map((event, idx) => {
                const cfg = urgencyConfig[event.urgency];
                const days = daysUntil(event.date);
                const isPast = event.urgency === "past";

                return (
                  <div key={event.id} className={`relative flex gap-6 ${idx < events.length - 1 ? "pb-8" : ""}`}>
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 mt-1">
                      <span className={`block w-[14px] h-[14px] rounded-full border-2 border-[#0C0A07] ${cfg.dot} mt-1`} />
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 rounded-2xl border p-5 transition-opacity ${isPast ? "opacity-50" : ""} ${
                      event.urgency === "critical"
                        ? "border-red-500/25 bg-red-500/5"
                        : event.urgency === "milestone"
                        ? "border-purple-500/25 bg-purple-500/5"
                        : "border-white/[0.08] bg-[#161109]"
                    }`}>
                      {/* Header row */}
                      <div className="flex flex-wrap items-start gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-1 ${phaseColors[event.phase]}`}>
                            {phaseLabels[event.phase]}
                          </p>
                          <h3 className="text-base font-bold text-[#EDE0CC] leading-snug">{event.title}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cfg.badge}`}>
                            {isPast
                              ? `${Math.abs(days)} days ago`
                              : days === 0
                              ? "Today"
                              : `${days} days`}
                          </span>
                          <span className="text-xs text-[#6E5E48]">{fmt(event.date)}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#9E8B71] leading-relaxed mb-3">{event.description}</p>

                      {/* Action */}
                      {!isPast && (
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-[#1E1812] border border-white/[0.06]">
                          <span className="text-[#C9A96E] flex-shrink-0 mt-0.5">→</span>
                          <p className="text-xs text-[#B8A68A] leading-relaxed">{event.action}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-6">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-2">Get deadline reminders</p>
              <p className="text-xs text-[#9E8B71] mb-4 leading-relaxed">
                Join OPTionality and we&apos;ll send you email reminders before each critical deadline — so you never miss a window.
              </p>
              <Link
                href="/#waitlist"
                className="inline-block px-4 py-2 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors"
              >
                Join the waitlist →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-2">Have questions?</p>
              <p className="text-xs text-[#9E8B71] mb-4 leading-relaxed">
                Ask the OPTionality AI Advisor anything about your specific situation — or book a free 1-on-1 with Guillaume.
              </p>
              <Link
                href="/advisor"
                className="inline-block px-4 py-2 rounded-lg border border-white/[0.12] text-[#9E8B71] text-sm font-medium hover:text-white hover:border-white/20 transition-colors"
              >
                Ask the AI Advisor →
              </Link>
            </div>
          </div>

          {/* Cross-sell: 90-day tracker */}
          <div className="mt-6 p-5 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-1">Already on OPT?</p>
              <p className="text-xs text-[#9E8B71] leading-relaxed">
                Track your 90-day unemployment clock in real time — see exactly how many days you&apos;ve used and how many remain.
              </p>
            </div>
            <Link
              href="/tools/tracker"
              className="flex-shrink-0 px-4 py-2.5 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-semibold hover:bg-[#F59E0B]/30 transition-colors whitespace-nowrap"
            >
              90-Day Tracker →
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-[#504133] text-center mt-8 leading-relaxed">
            This tool generates estimates based on standard OPT rules. Dates may vary by school, OIS processing time, and USCIS workload.
            Always confirm with your DSO and a licensed immigration attorney for your specific situation.
          </p>
        </div>
      )}
    </>
  );
}
