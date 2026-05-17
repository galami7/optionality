import type { Metadata } from "next";
import Link from "next/link";
import CapGapTool from "./cap-gap-tool";

export const metadata: Metadata = {
  title: "H-1B Cap-Gap Calculator — OPTionality",
  description:
    "Free tool for F-1 OPT students. Calculate your H-1B cap-gap protection window — how many days you can keep working between OPT expiry and your H-1B start date, and whether the 240-day rule applies.",
};

const faqItems = [
  {
    q: "What is H-1B cap-gap?",
    a: "Cap-gap is an automatic extension of F-1 status and work authorization for OPT holders whose H-1B petition was timely filed and is pending or approved while their OPT is still valid. It bridges the gap between OPT expiry and the H-1B start date of October 1.",
  },
  {
    q: "What is the 240-day rule?",
    a: "If your OPT expires while your H-1B petition is pending (filed but not yet decided), you may continue working for up to 240 days from your OPT expiry date — or until USCIS issues a decision, whichever comes first. This is separate from full cap-gap, which requires lottery selection.",
  },
  {
    q: "Can I travel internationally during cap-gap?",
    a: "Traveling internationally during cap-gap is risky and generally not recommended. If you leave the US, you may not be able to re-enter on OPT alone. You would need a valid H-1B visa stamp from a US consulate to re-enter, which requires a scheduled appointment abroad. Consult an immigration attorney before any international travel during cap-gap.",
  },
  {
    q: "What if my H-1B petition is denied during the 240-day period?",
    a: "If USCIS denies your petition during the 240-day window, you must stop working immediately. You enter a 60-day grace period to depart the US, change status, or enroll in a new program. Do not continue working after a denial — this creates unauthorized employment, which can bar future visa applications.",
  },
  {
    q: "Can I change employers during cap-gap?",
    a: "Changing employers during cap-gap is complex. The cap-gap applies to the specific H-1B petition and employer. If you change employers, your new employer must file an H-1B transfer petition. Consult an immigration attorney before making any employer changes during this period.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "H-1B Cap-Gap Calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser-based calculator for F-1 OPT holders to determine H-1B cap-gap protection window and 240-day rule applicability. No login required. Data never stored.",
    url: "https://opt-ionality.com/tools/cap-gap",
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

export default function CapGapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#6E5E48] mb-10">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#C9A96E] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[#9E8B71]">Cap-Gap Calculator</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#C9A96E]/10 text-[#C9A96E]">Free Tool</span>
              <span className="text-xs text-[#504133]">Runs in your browser · No data stored</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-[#EDE0CC] leading-tight mb-4">
              H-1B Cap-Gap Calculator
            </h1>
            <p className="text-lg text-[#9E8B71] leading-relaxed">
              Find out exactly how many days you can keep working between OPT expiry and your H-1B start —
              and whether the 240-day rule covers you while your petition is pending.
            </p>
          </header>

          {/* BLUF */}
          <div className="mb-10 p-5 rounded-2xl border border-[#C9A96E]/20 bg-[#C9A96E]/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-2">At a glance</p>
            <p className="text-sm text-[#9E8B71] leading-relaxed">
              H-1B cap-gap automatically extends F-1 status and work authorization for OPT holders with a timely-filed H-1B petition,
              bridging the period from OPT expiry to October 1 (H-1B start). If your petition is pending (not yet decided),
              the <strong className="text-[#EDE0CC]">240-day rule</strong> lets you continue working for up to 240 days after OPT expiry.
              International travel during cap-gap is risky — consult an attorney before leaving the US.
              Source: <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/h-1b-cap-gap" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">USCIS cap-gap guidance</a>.
            </p>
          </div>

          {/* Tool */}
          <CapGapTool />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#EDE0CC] mb-6">Cap-gap — common questions</h2>
            <div className="space-y-4">
              {faqItems.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6">
                  <h3 className="text-sm font-semibold text-[#EDE0CC] mb-2">{q}</h3>
                  <p className="text-sm text-[#9E8B71] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.08]">
            <Link href="/tools" className="text-sm text-[#9E8B71] hover:text-[#C9A96E] transition-colors">
              ← All Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
