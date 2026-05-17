import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free OPT Tools — OPTionality",
  description:
    "Free browser-based tools for F-1 OPT students. OPT Timeline Calculator, 90-Day Unemployment Tracker, STEM OPT Eligibility Checker, and H-1B Cap-Gap Calculator. No login. No data stored.",
};

const tools = [
  {
    href: "/timeline",
    label: "OPT Timeline Calculator",
    status: "live" as const,
    icon: "📅",
    desc: "Enter your graduation date and see every critical OPT deadline — OIS windows, EAD processing, 90-day clock, STEM extension dates.",
    cta: "Build my timeline →",
  },
  {
    href: "/tools/tracker",
    label: "90-Day Unemployment Tracker",
    status: "live" as const,
    icon: "⏱",
    desc: "Track your cumulative unemployment days in real time. See exactly where you stand against the 90-day USCIS limit — before it's too late.",
    cta: "Track my days →",
  },
  {
    href: null,
    label: "STEM OPT Eligibility Checker",
    status: "soon" as const,
    icon: "🔬",
    desc: "Answer 3 questions to find out if you qualify for STEM OPT extension, what E-Verify enrollment means, and what I-983 paperwork you need.",
    cta: null,
  },
  {
    href: null,
    label: "H-1B Cap-Gap Calculator",
    status: "soon" as const,
    icon: "🎯",
    desc: "Find out if your OPT is covered by cap-gap protection while your H-1B petition is pending — and for exactly how long.",
    cta: null,
  },
];

export default function ToolsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-10">
          <Link href="/" className="hover:text-[#22C55E] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#94A3B8]">Tools</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-3">Free tools</p>
          <h1 className="text-4xl font-black text-[#F8FAFC] mb-4">
            Know exactly where you stand.
          </h1>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            All tools run entirely in your browser. Your dates, school, and status are never sent to our servers
            and never stored. No login required.
          </p>
        </header>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {tools.map(({ href, label, status, icon, desc, cta }) => (
            <div
              key={label}
              className={`rounded-2xl border p-6 flex flex-col ${
                status === "live"
                  ? "border-white/[0.10] bg-[#0F1729] hover:border-white/20 transition-colors"
                  : "border-white/[0.06] bg-[#0A0F1E] opacity-70"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{icon}</span>
                {status === "live" ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                    Live
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.05] text-[#475569] border border-white/[0.06]">
                    Coming soon
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-[#F8FAFC] mb-2">{label}</h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed flex-1 mb-4">{desc}</p>

              {href && cta ? (
                <Link
                  href={href}
                  className="self-start px-4 py-2 rounded-lg bg-[#22C55E] text-[#080D1A] text-sm font-semibold hover:bg-[#4ADE80] transition-colors"
                >
                  {cta}
                </Link>
              ) : (
                <p className="text-xs text-[#475569]">Join the waitlist to be notified when this launches.</p>
              )}
            </div>
          ))}
        </div>

        {/* Data privacy note */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0F1729] p-6 mb-10">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Data & privacy</p>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Every tool on this page runs entirely client-side in your browser. No dates, school names, or personal
            details are transmitted to OPTionality&apos;s servers. We never share your information with employers,
            USCIS, your school, or any government entity.{" "}
            <Link href="/privacy" className="text-[#22C55E] hover:underline">
              Read our privacy policy →
            </Link>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#475569] leading-relaxed text-center">
          OPTionality tools provide estimates based on standard USCIS rules. Dates and eligibility may vary based on your specific situation.
          Always confirm with your DSO and a licensed immigration attorney.
          OPTionality is not a law firm and does not provide legal advice.
        </p>
      </div>
    </div>
  );
}
