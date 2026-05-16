import type { Metadata } from "next";
import Link from "next/link";
import WaitlistForm from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "OPTionality — Helping F-1 students realize they have more paths than they think",
  description:
    "OPTionality is the community, toolset, and launchpad for international students navigating OPT and building companies in the US. 294,253 students. Zero platforms built for them — until now.",
};

const stats = [
  { value: "294,253", label: "Active OPT holders", sub: "SEVIS 2024–2025 data" },
  { value: "90 days", label: "Unemployment clock", sub: "Starts the day OPT begins" },
  { value: "0", label: "Platforms built for you", sub: "Until now" },
  { value: "12%", label: "YoY growth in OPT", sub: "And accelerating" },
];

const painPoints = [
  {
    icon: "⏱",
    title: "The clock never stops",
    body: "90 days of unemployment. OIS delays. USCIS processing windows. Every missed deadline costs you your status — and nobody sends you reminders.",
  },
  {
    icon: "🗺",
    title: "Nobody explains the rules",
    body: "The DSO hands you a pamphlet. Reddit gives you 15 conflicting answers. Immigration lawyers charge $300 just to answer a question. There's no trusted peer source.",
  },
  {
    icon: "🌐",
    title: "Wrong networks",
    body: "Career fairs are built for citizens. Accelerators assume you can fundraise on a student visa. Your cohort doesn't understand visa anxiety. You're navigating alone.",
  },
  {
    icon: "🚀",
    title: "More paths than you think",
    body: "OPT isn't just a 12-month runway. STEM extensions, employer of record models, self-employment structures — there are real options. You just need someone who's been through it.",
  },
];

const offerings = [
  {
    tier: "01",
    title: "Free Community",
    price: "Free",
    timeline: "Now",
    description: "Join the Discord, attend monthly meetups, connect with international founders who get it. No jargon. No judgment.",
    features: ["Discord + Slack group", "Monthly founder meetups", "Peer Q&A with Guillaume", "Resource library"],
    cta: "Join the community",
    href: "/#waitlist",
    highlight: false,
  },
  {
    tier: "02",
    title: "Free 1-on-1s",
    price: "Free",
    timeline: "June 15, 2026",
    description: "30-minute calls to map your OPT timeline, talk through your venture idea, and figure out your actual options — from someone who has done it.",
    features: ["OPT timeline walkthrough", "Startup viability on a visa", "Employer of record Q&A", "Referrals to immigration attorneys"],
    cta: "Get on the list",
    href: "/#waitlist",
    highlight: true,
  },
  {
    tier: "03",
    title: "Founder Cohort",
    price: "$500–$1,500",
    timeline: "September 2026",
    description: "8–12 week guided program from idea to launch. Legal setup, banking, GTM, product — with other international founders building alongside you.",
    features: ["Weekly group sessions", "LLC + banking walkthrough", "Go-to-market strategy", "Accountability cohort"],
    cta: "Join waitlist",
    href: "/#waitlist",
    highlight: false,
  },
  {
    tier: "04",
    title: "Launch Under Me",
    price: "Stipend included",
    timeline: "Late 2026",
    description: "The signature offer. You join Gruyters Ventures as a W-2 employee — your OPT employer of record — while building your own company. IP stays yours.",
    features: ["W-2 OPT employer of record", "IP remains 100% yours", "Gruyters Ventures brand umbrella", "Optional equity arrangement"],
    cta: "Express interest",
    href: "/#waitlist",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #22C55E 0%, transparent 70%)" }}
        />
        <div className="mx-auto max-w-4xl text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Launching June 15, 2026 · Chicago, IL
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="opt-brand">
              <span className="opt">OPT</span>
              <span className="text-[#F8FAFC]">ionality</span>
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-[#94A3B8] font-medium max-w-2xl mx-auto mb-4 leading-snug">
            Helping F-1 students realize they have{" "}
            <span className="text-[#F8FAFC] font-semibold">more paths than they think.</span>
          </p>
          <p className="text-base text-[#64748B] max-w-xl mx-auto mb-10">
            Community, tools, and a launchpad for international students navigating OPT and building companies in the US.
            Built by a Belgian-Swiss founder who&apos;s been through it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#waitlist"
              className="px-6 py-3 rounded-xl bg-[#22C55E] text-[#080D1A] font-semibold text-base hover:bg-[#4ADE80] transition-colors shadow-lg shadow-[#22C55E]/20"
            >
              Join the waitlist →
            </Link>
            <Link
              href="/advisor"
              className="px-6 py-3 rounded-xl border border-white/[0.12] text-[#94A3B8] font-medium text-base hover:text-white hover:border-white/20 transition-colors"
            >
              Ask the AI Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.08] bg-[#0F1729] px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-gradient mb-1">{value}</p>
              <p className="text-sm font-semibold text-[#F8FAFC] mb-0.5">{label}</p>
              <p className="text-xs text-[#64748B]">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC]">
              OPT is the hardest thing<br className="hidden sm:block" /> nobody prepares you for.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {painPoints.map(({ icon, title, body }) => (
              <div key={title} className="card-hover rounded-2xl border border-white/[0.08] bg-[#0F1729] p-7">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#0F1729] border-y border-white/[0.08]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-3">The Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC]">Four ways we help you build.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map(({ tier, title, price, timeline, description, features, cta, href, highlight }) => (
              <div
                key={tier}
                className={`card-hover rounded-2xl border p-7 relative ${
                  highlight ? "border-[#22C55E]/40 bg-[#22C55E]/5" : "border-white/[0.08] bg-[#162040]"
                }`}
              >
                {highlight && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#22C55E] text-[#080D1A] text-xs font-bold">
                    Launching first
                  </span>
                )}
                <p className="text-xs font-mono text-[#22C55E] mb-2">{tier}</p>
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-[#22C55E]">{price}</span>
                  <span className="text-[#64748B] text-xs">·</span>
                  <span className="text-xs text-[#64748B]">{timeline}</span>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">{description}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#CBD5E1]">
                      <span className="text-[#22C55E] text-base">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    highlight
                      ? "bg-[#22C55E] text-[#080D1A] hover:bg-[#4ADE80]"
                      : "border border-white/[0.12] text-[#94A3B8] hover:text-white hover:border-white/20"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPT Tool CTA */}
      <section id="opt-tool" className="px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-10 md:p-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-3">Free Tool</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
              Know your OPT timeline<br className="hidden sm:block" /> to the day.
            </h2>
            <p className="text-[#94A3B8] text-base max-w-xl mx-auto mb-8">
              Standard OPT deadlines, STEM extension windows, 90-day unemployment clock — all calculated
              from your graduation date. Color-coded urgency. No login required.
            </p>
            <Link
              href="/timeline"
              className="inline-block px-7 py-3.5 rounded-xl bg-[#22C55E] text-[#080D1A] font-bold text-base hover:bg-[#4ADE80] transition-colors shadow-lg shadow-[#22C55E]/20"
            >
              Calculate my OPT timeline →
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/[0.08] bg-[#0F1729]">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-xl md:text-2xl text-[#F8FAFC] font-medium leading-relaxed mb-6 italic">
            &ldquo;I moved across an ocean with a carry-on and a few ideas. Turns out that&apos;s enough to start.
            OPTionality is the resource I wish existed when I landed.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/30 flex items-center justify-center text-sm font-bold text-[#22C55E]">
              GG
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#F8FAFC]">Guillaume Gruyters</p>
              <p className="text-xs text-[#64748B]">Belgian-Swiss founder · Kellogg MBA &apos;26 · On OPT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-3">Launching June 15</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">Get early access.</h2>
          <p className="text-[#94A3B8] mb-8">
            Be first when the community opens. Refer 3 friends → get a free 1-on-1 session with Guillaume.
          </p>
          <WaitlistForm />
          <p className="text-xs text-[#475569] mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
