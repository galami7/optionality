"use client";

import { useState } from "react";
import Link from "next/link";
import { addDays, addMonths, fmt, daysBetween } from "@/lib/date-utils";

type StemAnswer = "yes" | "no" | "unsure";
type EVerifyAnswer = "yes" | "no" | "unknown";

type FormState = {
  stemAnswer: StemAnswer;
  eVerifyAnswer: EVerifyAnswer;
  optEndDate: string;
};

type Result =
  | { type: "eligible"; optEnd: Date; fileWindowOpen: Date; stemEnd: Date; daysUntilFileWindow: number }
  | { type: "ineligible_degree" }
  | { type: "ineligible_employer" }
  | { type: "verify_employer" }
  | { type: "check_stem_list" };

function computeResult(form: FormState): Result {
  if (form.stemAnswer === "no") return { type: "ineligible_degree" };
  if (form.stemAnswer === "unsure") return { type: "check_stem_list" };
  if (form.eVerifyAnswer === "unknown") return { type: "verify_employer" };
  if (form.eVerifyAnswer === "no") return { type: "ineligible_employer" };

  const optEnd = new Date(form.optEndDate + "T00:00:00");
  const fileWindowOpen = addDays(optEnd, -90);
  const stemEnd = addMonths(optEnd, 24);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilFileWindow = daysBetween(today, fileWindowOpen);

  return { type: "eligible", optEnd, fileWindowOpen, stemEnd, daysUntilFileWindow };
}

const checklist = [
  { label: "Confirm your degree is on the DHS STEM list", href: "https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf" },
  { label: "Verify your employer is actively E-Verify enrolled (not just registered)", href: "https://www.e-verify.gov/employers/e-verify-employers" },
  { label: "File Form I-765 within the 90-day window before OPT expires" },
  { label: "Complete Form I-983 Training Plan with your manager's signature" },
  { label: "Submit I-983 to your DSO and get updated I-20" },
];

export default function StemCheckerTool() {
  const [form, setForm] = useState<FormState>({
    stemAnswer: "yes",
    eVerifyAnswer: "yes",
    optEndDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const result = submitted ? computeResult(form) : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const stemOptions: { val: StemAnswer; label: string }[] = [
    { val: "yes", label: "Yes — it's on the DHS STEM list" },
    { val: "unsure", label: "I'm not sure" },
    { val: "no", label: "No — not a STEM field" },
  ];

  const eVerifyOptions: { val: EVerifyAnswer; label: string }[] = [
    { val: "yes", label: "Yes — my employer is E-Verify enrolled" },
    { val: "unknown", label: "I don't know" },
    { val: "no", label: "No — they're not enrolled" },
  ];

  return (
    <>
      {!submitted && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.08] bg-[#161109] p-8 md:p-10 mb-10">
          <h2 className="text-lg font-bold text-[#EDE0CC] mb-6">Three questions. 60 seconds.</h2>

          {/* Q1: STEM field */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-[#EDE0CC] mb-1">
              Is your degree in a STEM field?
            </label>
            <a
              href="https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#C9A96E] hover:underline block mb-3"
            >
              Check the DHS STEM Designated Degree Program List ↗
            </a>
            <div className="space-y-2">
              {stemOptions.map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, stemAnswer: val }))}
                  className={`w-full px-4 py-3 rounded-xl text-sm text-left border transition-colors ${
                    form.stemAnswer === val
                      ? "border-[#C9A96E]/50 bg-[#C9A96E]/10 text-[#C9A96E]"
                      : "border-white/[0.08] bg-[#1E1812] text-[#9E8B71] hover:text-[#EDE0CC]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: E-Verify */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-[#EDE0CC] mb-1">
              Is your employer enrolled in E-Verify?
            </label>
            <p className="text-xs text-[#6E5E48] mb-3">
              Must be actively enrolled — not just registered. Ask HR directly or search the{" "}
              <a href="https://www.e-verify.gov/about-e-verify/e-verify-data/what-data-is-available/e-verify-employer-search" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">E-Verify employer search</a>.
            </p>
            <div className="space-y-2">
              {eVerifyOptions.map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, eVerifyAnswer: val }))}
                  className={`w-full px-4 py-3 rounded-xl text-sm text-left border transition-colors ${
                    form.eVerifyAnswer === val
                      ? "border-[#C9A96E]/50 bg-[#C9A96E]/10 text-[#C9A96E]"
                      : "border-white/[0.08] bg-[#1E1812] text-[#9E8B71] hover:text-[#EDE0CC]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: OPT end date — only relevant for eligible path */}
          {form.stemAnswer === "yes" && form.eVerifyAnswer === "yes" && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#EDE0CC] mb-1">
                When does your standard OPT expire?
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
          )}

          <button
            type="submit"
            disabled={form.stemAnswer === "yes" && form.eVerifyAnswer === "yes" && !form.optEndDate}
            className="w-full py-4 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-bold text-base hover:bg-[#D4B882] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#C9A96E]/20"
          >
            Check my eligibility →
          </button>
        </form>
      )}

      {/* Results */}
      {result && (
        <div>
          {result.type === "eligible" && (
            <>
              {/* Hero result */}
              <div className="rounded-2xl border border-[#C9A96E]/25 bg-[#C9A96E]/5 p-8 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/30">
                    Eligible
                  </span>
                </div>
                <p className="text-4xl font-black text-[#EDE0CC] mb-1">+24 months.</p>
                <p className="text-lg text-[#C9A96E] font-semibold mb-4">
                  You qualify for STEM OPT extension.
                </p>
                <p className="text-sm text-[#9E8B71] leading-relaxed">
                  That&apos;s enough runway to hit an H-1B lottery. Use it — but you have to file before your standard OPT expires.
                </p>
              </div>

              {/* Key dates */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9E8B71] mb-4">Your STEM OPT dates</p>
                <div className="space-y-3">
                  {[
                    {
                      label: "File I-765 extension starting",
                      date: fmt(result.fileWindowOpen),
                      note: "90 days before OPT expires — this is when you can start",
                      urgent: result.daysUntilFileWindow <= 30 && result.daysUntilFileWindow >= 0,
                    },
                    {
                      label: "Standard OPT expires",
                      date: fmt(result.optEnd),
                      note: "Must file before this date. If pending, 180-day cap gap kicks in.",
                      urgent: false,
                    },
                    {
                      label: "STEM OPT ends",
                      date: fmt(result.stemEnd),
                      note: "Your total OPT runway ends. H-1B planning must start 18+ months before this.",
                      urgent: false,
                    },
                  ].map(({ label, date, note, urgent }) => (
                    <div key={label} className={`p-4 rounded-xl border ${urgent ? "border-[#F59E0B]/30 bg-[#F59E0B]/5" : "border-white/[0.06] bg-[#1E1812]"}`}>
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${urgent ? "text-[#F59E0B]" : "text-[#6E5E48]"}`}>
                        {label}
                      </p>
                      <p className="text-base font-bold text-[#EDE0CC] mb-1">{date}</p>
                      <p className="text-xs text-[#6E5E48] leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9E8B71] mb-4">Your STEM OPT checklist</p>
                <ul className="space-y-3">
                  {checklist.map(({ label, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="text-[#C9A96E] mt-0.5 flex-shrink-0">→</span>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#9E8B71] hover:text-[#C9A96E] transition-colors leading-relaxed">
                          {label} ↗
                        </a>
                      ) : (
                        <p className="text-sm text-[#9E8B71] leading-relaxed">{label}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 180-day cap gap note */}
              <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 mb-8">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">180-day cap gap rule</p>
                <p className="text-sm text-[#9E8B71] leading-relaxed">
                  If your STEM extension I-765 is still pending when your standard OPT expires, you automatically receive 180 additional days of work authorization.
                  Keep working. Do not stop. Keep your I-797 receipt notice with you at all times.
                </p>
              </div>
            </>
          )}

          {result.type === "ineligible_degree" && (
            <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-8 mb-6">
              <p className="text-sm font-semibold text-red-400 mb-2">Not eligible — degree field</p>
              <p className="text-4xl font-black text-[#EDE0CC] mb-4">12 months.</p>
              <p className="text-[#9E8B71] text-sm leading-relaxed mb-4">
                Your degree field isn&apos;t on the DHS STEM Designated Degree Program List.
                Your OPT runway is 12 months. This is still meaningful time — use it to target H-1B employers early.
              </p>
              <a
                href="https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#C9A96E] hover:underline"
              >
                Double-check the DHS STEM list ↗
              </a>
            </div>
          )}

          {result.type === "ineligible_employer" && (
            <div className="rounded-2xl border border-[#F59E0B]/25 bg-[#F59E0B]/5 p-8 mb-6">
              <p className="text-sm font-semibold text-[#F59E0B] mb-2">Not eligible yet — employer</p>
              <p className="text-4xl font-black text-[#EDE0CC] mb-4">Your employer needs to enroll.</p>
              <p className="text-[#9E8B71] text-sm leading-relaxed mb-4">
                STEM OPT requires your employer to be actively enrolled in E-Verify — not just aware of it.
                Enrollment is free and takes ~2 weeks. Many employers will do this when asked directly, especially if you frame it as a compliance benefit.
              </p>
              <div className="space-y-2 text-sm text-[#9E8B71]">
                <p className="flex gap-2"><span className="text-[#F59E0B]">→</span> Ask your HR or legal team to enroll at <a href="https://www.e-verify.gov" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">e-verify.gov ↗</a></p>
                <p className="flex gap-2"><span className="text-[#F59E0B]">→</span> Enrollment typically takes 2–3 weeks</p>
                <p className="flex gap-2"><span className="text-[#F59E0B]">→</span> You can still file STEM extension once enrolled, as long as standard OPT hasn&apos;t expired</p>
              </div>
            </div>
          )}

          {result.type === "verify_employer" && (
            <div className="rounded-2xl border border-white/[0.10] bg-[#161109] p-8 mb-6">
              <p className="text-sm font-semibold text-[#9E8B71] mb-2">Find out before you assume</p>
              <p className="text-2xl font-bold text-[#EDE0CC] mb-4">Verify your employer&apos;s E-Verify status now.</p>
              <div className="space-y-3 text-sm text-[#9E8B71]">
                <p className="flex gap-2"><span className="text-[#C9A96E]">→</span> <span>Search the <a href="https://www.e-verify.gov/about-e-verify/e-verify-data/what-data-is-available/e-verify-employer-search" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">E-Verify employer search ↗</a></span></p>
                <p className="flex gap-2"><span className="text-[#C9A96E]">→</span> Email HR: &ldquo;Is [Company] enrolled in E-Verify? I need this to confirm my STEM OPT extension eligibility.&rdquo;</p>
                <p className="flex gap-2"><span className="text-[#C9A96E]">→</span> If yes, come back and run this tool again with your OPT end date</p>
              </div>
            </div>
          )}

          {result.type === "check_stem_list" && (
            <div className="rounded-2xl border border-white/[0.10] bg-[#161109] p-8 mb-6">
              <p className="text-2xl font-bold text-[#EDE0CC] mb-4">Check the DHS STEM list — it takes 2 minutes.</p>
              <p className="text-sm text-[#9E8B71] leading-relaxed mb-4">
                The list has 475+ CIP codes. Your degree catalog will show your program&apos;s CIP code — or ask your registrar.
                Many students are surprised: Business Analytics, Information Science, and several social science programs qualify.
              </p>
              <a
                href="https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2.5 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors"
              >
                Open the DHS STEM list ↗
              </a>
            </div>
          )}

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-6">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-2">Get filing reminders</p>
              <p className="text-xs text-[#9E8B71] mb-4 leading-relaxed">We&apos;ll email you 90 days before your OPT expires so you never miss the STEM filing window.</p>
              <Link href="/#waitlist" className="inline-block px-4 py-2 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors">
                Join the waitlist →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6">
              <p className="text-sm font-semibold text-[#EDE0CC] mb-2">Questions about I-983?</p>
              <p className="text-xs text-[#9E8B71] mb-4 leading-relaxed">The Training Plan is where most people get tripped up. Ask the AI Advisor.</p>
              <Link href="/advisor" className="inline-block px-4 py-2 rounded-lg border border-white/[0.12] text-[#9E8B71] text-sm font-medium hover:text-white hover:border-white/20 transition-colors">
                Ask the AI Advisor →
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button onClick={() => setSubmitted(false)} className="text-sm text-[#6E5E48] hover:text-[#9E8B71] transition-colors">
              ← Check again with different answers
            </button>
          </div>

          <p className="text-xs text-[#504133] text-center mt-6 leading-relaxed">
            Estimates based on standard USCIS STEM OPT rules. Always confirm with your DSO and a licensed immigration attorney.
          </p>
        </div>
      )}
    </>
  );
}
