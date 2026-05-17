import type { Metadata } from "next";
import Link from "next/link";
import TrackerTool from "./tracker-tool";

export const metadata: Metadata = {
  title: "OPT 90-Day Unemployment Tracker — OPTionality",
  description:
    "Free tool for F-1 OPT holders. Enter your EAD start date and see exactly how many of your 90 cumulative unemployment days you've used — and how many remain before USCIS automatically terminates your OPT.",
};

const faqItems = [
  {
    q: "What counts as unemployment under OPT?",
    a: "Any day you are not working at least 20 hours per week for a qualifying employer counts toward your 90-day cumulative limit. This includes days before your first job, gaps between jobs, and part-time work below 20 hours/week. Interviewing, volunteering, and unpaid internships do not count as qualifying employment.",
  },
  {
    q: "Do interview days count against the 90-day clock?",
    a: "No. Interviewing and active job searching do not count as qualifying employment. Every day you spend searching without an active employment arrangement counts toward the 90-day clock — which is why filing early and job-searching immediately is critical.",
  },
  {
    q: "What happens if I hit 90 days of unemployment?",
    a: "Your OPT is automatically terminated by USCIS — without notice or warning. You enter a 60-day grace period to depart the US, change status, or transfer schools. This cannot be reversed once triggered. Contact a licensed immigration attorney immediately if you're approaching 75–80 days.",
  },
  {
    q: "Does STEM OPT have the same 90-day rule?",
    a: "STEM OPT has a higher 150-day cumulative unemployment limit. However, any days counted during your standard OPT period carry over and count toward the 150-day STEM OPT limit — the clocks are cumulative across both periods.",
  },
  {
    q: "Does the 90-day clock reset if I change employers?",
    a: "No. The clock is cumulative across your entire OPT period and does not reset when you start a new job. The gap between your old job ending and your new one starting counts toward your total. Document every gap carefully.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OPT 90-Day Unemployment Tracker",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser-based tool for F-1 OPT holders to track cumulative unemployment days against the USCIS 90-day limit. No login required. Data never stored.",
    url: "https://opt-ionality.com/tools/tracker",
    author: {
      "@type": "Person",
      name: "Guillaume",
      url: "https://opt-ionality.com/about",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export default function TrackerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-10">
            <Link href="/" className="hover:text-[#22C55E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#22C55E] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[#94A3B8]">90-Day Tracker</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#22C55E]/10 text-[#22C55E]">
                Free Tool
              </span>
              <span className="text-xs text-[#475569]">Runs in your browser · No data stored</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#F8FAFC] leading-tight mb-4">
              OPT 90-Day Unemployment Tracker
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              Enter your EAD start date and see exactly how many cumulative unemployment days you&apos;ve used —
              and how many remain before USCIS automatically terminates your OPT.
            </p>
          </header>

          {/* BLUF */}
          <div className="mb-10 p-5 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-2">At a glance</p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              F-1 OPT holders may accumulate up to <strong className="text-[#F8FAFC]">90 cumulative days of unemployment</strong> during standard OPT.
              The clock runs from your EAD start date. At 90 days, USCIS automatically terminates OPT — no notice is sent.
              STEM OPT raises this to 150 cumulative days. Days from standard OPT carry over.
              Source: <a href="https://www.ice.gov/sevis/practical-training" target="_blank" rel="noopener noreferrer" className="text-[#22C55E] hover:underline">ICE SEVIS</a>, <a href="https://studyinthestates.dhs.gov/students/student-employment/optional-practical-training-opt" target="_blank" rel="noopener noreferrer" className="text-[#22C55E] hover:underline">DHS Study in the States</a>.
            </p>
          </div>

          {/* Tool */}
          <TrackerTool />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqItems.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-white/[0.08] bg-[#0F1729] p-6">
                  <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">{q}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-white/[0.08]">
            <Link href="/tools" className="text-sm text-[#94A3B8] hover:text-[#22C55E] transition-colors">
              ← All Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
