import type { Metadata } from "next";
import Link from "next/link";
import StemCheckerTool from "./stem-checker-tool";

export const metadata: Metadata = {
  title: "STEM OPT Eligibility Checker — OPTionality",
  description:
    "Free tool for F-1 OPT students. Find out in 60 seconds if you qualify for the 24-month STEM OPT extension — and see exactly when to file, what your employer needs, and what the I-983 requires.",
};

const faqItems = [
  {
    q: "What is STEM OPT and how long is it?",
    a: "STEM OPT is a 24-month extension of standard OPT, available to students whose degree is in a field listed on the DHS STEM Designated Degree Program List. If you qualify, your total OPT runway is 36 months — enough to participate in at least one H-1B lottery cycle.",
  },
  {
    q: "What does 'actively enrolled in E-Verify' mean?",
    a: "Your employer must be an active participant in E-Verify — the federal employment eligibility verification system. Being 'registered' or 'aware of' E-Verify is not enough. You can verify your employer's status at e-verify.gov. Many employers will enroll when asked — it's free and takes about 2 weeks.",
  },
  {
    q: "What is Form I-983 and who completes it?",
    a: "Form I-983 is a Training Plan for STEM OPT Students, completed jointly by you and your employer. It documents your role, your supervisor, how the work relates to your degree, and the training goals. Your employer's HR or legal team will typically lead this process. It must be submitted to your DSO before you can file the I-765 extension.",
  },
  {
    q: "When should I file my STEM OPT extension?",
    a: "You can file your I-765 STEM extension starting 90 days before your standard OPT expires. File as early as possible — USCIS processing times can exceed 3 months. If your extension is still pending when OPT expires, a 180-day automatic cap gap keeps you authorized to work.",
  },
  {
    q: "Does STEM OPT have a 90-day unemployment rule?",
    a: "STEM OPT has a higher limit: 150 cumulative days of unemployment (vs. 90 for standard OPT). Days unemployed during standard OPT carry over and count toward the 150-day STEM OPT limit. The clocks are cumulative across both periods.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "STEM OPT Eligibility Checker",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser-based tool for F-1 students to check STEM OPT extension eligibility in 60 seconds. No login required. Data never stored.",
    url: "https://opt-ionality.com/tools/stem-checker",
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

export default function StemCheckerPage() {
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
            <span className="text-[#9E8B71]">STEM OPT Checker</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#C9A96E]/10 text-[#C9A96E]">Free Tool</span>
              <span className="text-xs text-[#504133]">Runs in your browser · No data stored</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-[#EDE0CC] leading-tight mb-4">
              STEM OPT Eligibility Checker
            </h1>
            <p className="text-lg text-[#9E8B71] leading-relaxed">
              Find out in 60 seconds if you qualify for the 24-month STEM OPT extension —
              and get your exact filing window, employer checklist, and key dates.
            </p>
          </header>

          {/* BLUF */}
          <div className="mb-10 p-5 rounded-2xl border border-[#C9A96E]/20 bg-[#C9A96E]/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-2">At a glance</p>
            <p className="text-sm text-[#9E8B71] leading-relaxed">
              STEM OPT extends standard OPT by <strong className="text-[#EDE0CC]">24 months</strong>, bringing total authorized runway to <strong className="text-[#EDE0CC]">36 months</strong>.
              Requirements: degree on the <a href="https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">DHS STEM list</a>,
              employer actively enrolled in <a href="https://www.e-verify.gov" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">E-Verify</a>,
              and a signed Form I-983 Training Plan. File I-765 within 90 days of OPT expiry.
              If pending at expiry, a 180-day cap gap keeps you working. Source:{" "}
              <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-extension-for-stem-students-stem-opt" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">USCIS STEM OPT</a>.
            </p>
          </div>

          {/* Tool */}
          <StemCheckerTool />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#EDE0CC] mb-6">STEM OPT — common questions</h2>
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
