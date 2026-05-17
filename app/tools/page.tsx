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
    href: "/tools/stem-checker",
    label: "STEM OPT Eligibility Checker",
    status: "live" as const,
    icon: "🔬",
    desc: "Answer 3 questions to find out if you qualify for the 24-month STEM OPT extension, what your employer needs to do, and exactly when to file.",
    cta: "Check my eligibility →",
  },
  {
    href: "/tools/cap-gap",
    label: "H-1B Cap-Gap Calculator",
    status: "live" as const,
    icon: "🎯",
    desc: "Find out how many days cap-gap covers you between OPT expiry and Oct 1, and whether the 240-day rule applies while your petition is pending.",
    cta: "Calculate my cap-gap →",
  },
];

export default function ToolsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6E5E48] mb-10">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#9E8B71]">Tools</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">Free tools</p>
          <h1 className="font-display text-4xl font-black text-[#EDE0CC] mb-4">
            Know exactly where you stand.
          </h1>
          <p className="text-lg text-[#9E8B71] leading-relaxed max-w-2xl">
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
                  ? "border-white/[0.10] bg-[#161109] hover:border-white/20 transition-colors"
                  : "border-white/[0.06] bg-[#100C08] opacity-70"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{icon}</span>
                {status === "live" ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20">
                    Live
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.05] text-[#504133] border border-white/[0.06]">
                    Coming soon
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-[#EDE0CC] mb-2">{label}</h2>
              <p className="text-sm text-[#9E8B71] leading-relaxed flex-1 mb-4">{desc}</p>

              {href && cta ? (
                <Link
                  href={href}
                  className="self-start px-4 py-2 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors"
                >
                  {cta}
                </Link>
              ) : (
                <p className="text-xs text-[#504133]">Join the waitlist to be notified when this launches.</p>
              )}
            </div>
          ))}
        </div>

        {/* Data privacy note */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6 mb-10">
          <p className="text-xs font-semibold text-[#9E8B71] uppercase tracking-widest mb-2">Data & privacy</p>
          <p className="text-sm text-[#6E5E48] leading-relaxed">
            Every tool on this page runs entirely client-side in your browser. No dates, school names, or personal
            details are transmitted to OPTionality&apos;s servers. We never share your information with employers,
            USCIS, your school, or any government entity.{" "}
            <Link href="/privacy" className="text-[#C9A96E] hover:underline">
              Read our privacy policy →
            </Link>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#504133] leading-relaxed text-center">
          OPTionality tools provide estimates based on standard USCIS rules. Dates and eligibility may vary based on your specific situation.
          Always confirm with your DSO and a licensed immigration attorney.
          OPTionality is not a law firm and does not provide legal advice.
        </p>
      </div>
    </div>
  );
}
