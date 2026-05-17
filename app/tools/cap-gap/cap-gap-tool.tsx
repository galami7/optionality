"use client";

import { useState } from "react";
import Link from "next/link";
import { addDays, fmt, daysBetween } from "@/lib/date-utils";

type H1bStatus = "selected" | "pending" | "none";

type FormState = {
  optEndDate: string;
  h1bStatus: H1bStatus;
  h1bStartYear: string;
};

type Result =
  | { type: "full_cap_gap"; optEnd: Date; h1bStart: Date; daysProtected: number }
  | { type: "rule_240"; optEnd: Date; protectionEnd: Date; daysProtected: number }
  | { type: "no_cap_gap" };

function computeResult(form: FormState): Result {
  const optEnd = new Date(form.optEndDate + "T00:00:00");

  if (form.h1bStatus === "none") return { type: "no_cap_gap" };

  if (form.h1bStatus === "selected") {
    const h1bStart = new Date(`${form.h1bStartYear}-10-01T00:00:00`);
    const daysProtected = Math.max(0, daysBetween(optEnd, h1bStart));
    return { type: "full_cap_gap", optEnd, h1bStart, daysProtected };
  }

  // pending — 240-day rule
  const protectionEnd = addDays(optEnd, 240);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysProtected = Math.max(0, daysBetween(today > optEnd ? today : optEnd, protectionEnd));
  return { type: "rule_240", optEnd, protectionEnd, daysProtected };
}

const h1bOptions: { val: H1bStatus; label: string; sub: string }[] = [
  {
    val: "selected",
    label: "Selected in H-1B lottery",
    sub: "I have a cap-gap I-797 notice",
  },
  {
    val: "pending",
    label: "Petition filed, awaiting decision",
    sub: "USCIS received my I-129 before April 1",
  },
  {
    val: "none",
    label: "Not selected / not filed",
    sub: "I'm not in this lottery cycle",
  },
];

const currentYear = new Date().getFullYear();
const yearOptions = [currentYear, currentYear + 1];

export default function CapGapTool() {
  const [form, setForm] = useState<FormState>({
    optEndDate: "",
    h1bStatus: "selected",
    h1bStartYear: String(currentYear),
  });
  const [submitted, setSubmitted] = useState(false);

  const result = submitted ? computeResult(form) : null;
  const canSubmit = form.optEndDate && (form.h1bStatus !== "selected" || form.h1bStartYear);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <>
      {!submitted && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.08] bg-[#161109] p-8 md:p-10 mb-10">
          <h2 className="text-lg font-bold text-[#EDE0CC] mb-6">Two inputs. Instant answer.</h2>

          {/* OPT end date */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-[#EDE0CC] mb-1">
              When does your OPT expire?
            </label>
            <p className="text-xs text-[#6E5E48] mb-3">The end date printed on your EAD card.</p>
            <input
              type="date"
              required
              value={form.optEndDate}
              onChange={(e) => setForm((f) => ({ ...f, optEndDate: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#1E1812] border border-white/[0.10] text-[#EDE0CC] text-sm focus:outline-none focus:border-[#C9A96E]/50 [color-scheme:dark]"
            />
          </div>

          {/* H-1B status */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-[#EDE0CC] mb-3">
              What&apos;s your H-1B status?
            </label>
            <div className="space-y-2">
              {h1bOptions.map(({ val, label, sub }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, h1bStatus: val }))}
                  className={`w-full px-4 py-3 rounded-xl text-left border transition-colors ${
                    form.h1bStatus === val
                      ? "border-[#C9A96E]/50 bg-[#C9A96E]/10"
                      : "border-white/[0.08] bg-[#1E1812] hover:border-white/20"
                  }`}
                >
                  <p className={`text-sm font-medium ${form.h1bStatus === val ? "text-[#C9A96E]" : "text-[#EDE0CC]"}`}>{label}</p>
                  <p className="text-xs text-[#6E5E48] mt-0.5">{sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* H-1B start year (for selected) */}
          {form.h1bStatus === "selected" && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#EDE0CC] mb-2">
                H-1B start year (Oct 1 of which year?)
              </label>
              <div className="flex gap-3">
                {yearOptions.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, h1bStartYear: String(y) }))}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                      form.h1bStartYear === String(y)
                        ? "border-[#C9A96E]/50 bg-[#C9A96E]/10 text-[#C9A96E]"
                        : "border-white/[0.08] bg-[#1E1812] text-[#9E8B71] hover:text-[#EDE0CC]"
                    }`}
                  >
                    Oct 1, {y}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-4 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-bold text-base hover:bg-[#D4B882] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#C9A96E]/20"
          >
            Calculate my cap-gap →
          </button>
        </form>
      )}

      {/* Results */}
      {result && (
        <div>
          {result.type === "full_cap_gap" && (
            <>
              <div className="rounded-2xl border border-[#C9A96E]/25 bg-[#C9A96E]/5 p-8 mb-6">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/30 inline-block mb-4">
                  Cap-gap protected
                </span>
                <p className="text-4xl font-black text-[#EDE0CC] mb-1">{result.daysProtected} days.</p>
                <p className="text-lg text-[#C9A96E] font-semibold mb-4">You can keep working.</p>
                <p className="text-sm text-[#9E8B71] leading-relaxed">
                  Your H-1B lottery selection covers you from OPT expiry ({fmt(result.optEnd)}) through your H-1B start
                  ({fmt(result.h1bStart)}). Do not stop working during this period — cap-gap is automatic and requires no additional filing.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9E8B71] mb-4">What cap-gap covers (and doesn&apos;t)</p>
                <div className="space-y-2 text-sm">
                  <p className="flex gap-2 text-[#9E8B71]"><span className="text-[#C9A96E] flex-shrink-0">✓</span> Work authorization in the US — keep your current job</p>
                  <p className="flex gap-2 text-[#9E8B71]"><span className="text-[#C9A96E] flex-shrink-0">✓</span> Status maintenance — you remain in valid F-1 status</p>
                  <p className="flex gap-2 text-[#9E8B71]"><span className="text-red-400 flex-shrink-0">✗</span> International travel — leaving and re-entering is risky. You&apos;d need an H-1B visa stamp at a consulate to return. Talk to an attorney before any travel.</p>
                  <p className="flex gap-2 text-[#9E8B71]"><span className="text-red-400 flex-shrink-0">✗</span> Changing employers — requires an H-1B transfer, not covered by cap-gap alone</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 mb-8">
                <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wide mb-2">Don&apos;t miss Oct 1</p>
                <p className="text-sm text-[#9E8B71] leading-relaxed">
                  Your cap-gap ends the day H-1B begins — {fmt(result.h1bStart)}. If USCIS hasn&apos;t approved your petition by then, you&apos;re still covered (H-1B is considered started on Oct 1 regardless of when approval arrives, as long as the petition was properly filed).
                </p>
              </div>
            </>
          )}

          {result.type === "rule_240" && (
            <>
              <div className="rounded-2xl border border-[#F59E0B]/25 bg-[#F59E0B]/5 p-8 mb-6">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 inline-block mb-4">
                  240-day rule applies
                </span>
                <p className="text-4xl font-black text-[#EDE0CC] mb-1">240 days.</p>
                <p className="text-lg text-[#F59E0B] font-semibold mb-4">You can keep working while the petition is pending.</p>
                <p className="text-sm text-[#9E8B71] leading-relaxed">
                  Your H-1B petition was timely filed (before your OPT expired). Under the 240-day rule, you may continue working
                  for up to 240 days after OPT expiry — or until USCIS issues a decision, whichever comes first.
                  Protection ends: <strong className="text-[#EDE0CC]">{fmt(result.protectionEnd)}</strong>.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9E8B71] mb-4">240-day rule — the fine print</p>
                <div className="space-y-3 text-sm text-[#9E8B71]">
                  <p className="flex gap-2"><span className="text-[#F59E0B] flex-shrink-0">→</span> Protection ends at <strong className="text-[#EDE0CC]">{fmt(result.protectionEnd)}</strong> OR when USCIS issues a decision — whichever is first</p>
                  <p className="flex gap-2"><span className="text-[#F59E0B] flex-shrink-0">→</span> If USCIS approves before 240 days: H-1B starts Oct 1, you&apos;re fine</p>
                  <p className="flex gap-2"><span className="text-[#F59E0B] flex-shrink-0">→</span> If USCIS denies: stop working immediately, enter grace period</p>
                  <p className="flex gap-2"><span className="text-red-400 flex-shrink-0">✗</span> Do not travel internationally during this period — re-entry is not guaranteed</p>
                </div>
              </div>
            </>
          )}

          {result.type === "no_cap_gap" && (
            <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-8 mb-6">
              <p className="text-sm font-semibold text-red-400 mb-2">No cap-gap protection</p>
              <p className="text-2xl font-bold text-[#EDE0CC] mb-4">Plan your next step before OPT expires.</p>
              <p className="text-sm text-[#9E8B71] leading-relaxed mb-4">
                Without an H-1B selection or pending petition, there is no cap-gap coverage.
                When your OPT expires, you enter a 60-day grace period to depart the US, change immigration status, or enroll in a new program.
              </p>
              <div className="space-y-2 text-sm text-[#9E8B71]">
                <p className="flex gap-2"><span className="text-[#C9A96E] flex-shrink-0">→</span> STEM OPT extension (if eligible) adds 24 months — check our <Link href="/tools/stem-checker" className="text-[#C9A96E] hover:underline">STEM checker</Link></p>
                <p className="flex gap-2"><span className="text-[#C9A96E] flex-shrink-0">→</span> O-1 visa for extraordinary ability (no lottery, employer files on your behalf)</p>
                <p className="flex gap-2"><span className="text-[#C9A96E] flex-shrink-0">→</span> Graduate school enrollment (new F-1 start)</p>
                <p className="flex gap-2"><span className="text-[#C9A96E] flex-shrink-0">→</span> Consult an immigration attorney about your specific options</p>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-6">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-2">Stay ahead of deadlines</p>
              <p className="text-xs text-[#9E8B71] mb-4 leading-relaxed">Join OPTionality and we&apos;ll send reminders before key dates — Oct 1, 240-day limits, petition deadlines.</p>
              <Link href="/#waitlist" className="inline-block px-4 py-2 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors">
                Join the waitlist →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-2">Questions about your situation?</p>
              <p className="text-xs text-[#9E8B71] mb-4 leading-relaxed">Cap-gap rules have edge cases. Ask the AI Advisor or consult a licensed immigration attorney.</p>
              <Link href="/advisor" className="inline-block px-4 py-2 rounded-lg border border-white/[0.12] text-[#9E8B71] text-sm font-medium hover:text-white hover:border-white/20 transition-colors">
                Ask the AI Advisor →
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button onClick={() => setSubmitted(false)} className="text-sm text-[#6E5E48] hover:text-[#9E8B71] transition-colors">
              ← Recalculate
            </button>
          </div>

          <p className="text-xs text-[#504133] text-center mt-6 leading-relaxed">
            Estimates based on standard USCIS cap-gap rules. Always confirm with your DSO and a licensed immigration attorney.
            OPTionality is not a law firm and does not provide legal advice.
          </p>
        </div>
      )}
    </>
  );
}
