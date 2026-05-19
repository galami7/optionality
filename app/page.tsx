import type { Metadata } from "next";
import Link from "next/link";
import WaitlistForm from "@/components/waitlist-form";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "OPTionality — Helping F-1 students realize they have more paths than they think",
  description:
    "The community, newsletter, and tools for the 294,253 international students navigating OPT in the US. Built by a Belgian-Swiss founder who filed I-765 himself.",
};

const stats = [
  {
    value: "294,253",
    label: "Active OPT holders",
    sub: "SEVIS 2024–2025",
    href: "https://www.ice.gov/doclib/sevis/pdf/sevisOPTbySEVISSchool2025.pdf",
  },
  {
    value: "90 days",
    label: "Unemployment limit",
    sub: "USCIS rule — cumulative",
    href: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students",
  },
  {
    value: "36 months",
    label: "Max OPT runway",
    sub: "Standard + STEM extension",
    href: "https://studyinthestates.dhs.gov/students/training-opportunities-in-the-united-states",
  },
  {
    value: "12%",
    label: "YoY growth in OPT",
    sub: "And accelerating",
    href: "https://www.ice.gov/sevis/data-mart",
  },
];

const painPoints = [
  {
    icon: "⏱",
    title: "The clock never stops",
    body: "90 cumulative days of unemployment. OIS delays eating into your window. USCIS processing at 3–5 months. Every missed deadline is a status risk — and nobody sends you reminders.",
  },
  {
    icon: "🗺",
    title: "Nobody explains the rules",
    body: "Your DSO hands you a pamphlet. Reddit gives you 15 conflicting answers. Attorneys charge $300 just to pick up the phone. There's no trusted peer source — until now.",
  },
  {
    icon: "🌐",
    title: "Wrong networks",
    body: "Career fairs are built for citizens. Accelerators assume you can fundraise on a student visa. Your cohort doesn't understand visa anxiety. You're the only one navigating this.",
  },
  {
    icon: "🚀",
    title: "More paths than you think",
    body: "OPT isn't just a 12-month runway before panic. STEM extensions, employer of record models, self-employment on I-765 — the options exist. You just need someone who's lived them.",
  },
];

const offerings = [
  {
    tier: "01",
    title: "Free Community",
    price: "Free",
    timeline: "Now",
    description: "Join other F-1 students navigating the same system. Monthly meetups, peer Q&As, resource library. No jargon. No judgment.",
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
    description: "30-minute calls to map your OPT timeline, talk through your venture idea, and figure out your actual options — from someone who filed I-765 himself.",
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
    description: "8–12 week guided program from idea to launch. LLC setup, banking, GTM, product — with other international founders building alongside you.",
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
    description: "You join OPTionality as a W-2 employee — your OPT employer of record — while building your own company. Your IP stays yours.",
    features: ["W-2 OPT employer of record", "IP remains 100% yours", "OPTionality umbrella", "Optional equity arrangement"],
    cta: "Express interest",
    href: "/#waitlist",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #C9A96E 0%, transparent 70%)" }}
        />

        <FadeIn className="mx-auto max-w-4xl text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/10 text-[#C9A96E] text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
            Launching June 15, 2026 · Chicago, IL · Built by an F-1 founder
          </div>

          {/* Headline — peer-voiced, fear-reducing */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-[#EDE0CC]">Don&apos;t lose</span>{" "}
            <span className="text-gradient">your status.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#9E8B71] font-medium max-w-2xl mx-auto mb-3 leading-snug">
            Helping F-1 students realize they have{" "}
            <span className="text-[#EDE0CC] font-semibold">more paths than they think.</span>
          </p>

          <p className="text-base text-[#6E5E48] max-w-xl mx-auto mb-10">
            The community, newsletter, and tools for 294,253 students navigating OPT —
            built by a Belgian-Swiss founder who filed I-765 himself.
            Peer navigation, not legal advice.
          </p>

          {/* CTAs — value-first, email second */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link
              href="/timeline"
              className="px-7 py-3.5 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-bold text-base hover:bg-[#D4B882] transition-colors shadow-lg shadow-[#C9A96E]/20"
            >
              See your OPT timeline →
            </Link>
            <Link
              href="/#waitlist"
              className="px-6 py-3.5 rounded-xl border border-white/[0.12] text-[#9E8B71] font-medium text-base hover:text-white hover:border-white/20 transition-colors"
            >
              Join 1,000+ F-1 students
            </Link>
          </div>

          {/* Wordmark — secondary */}
          <p className="text-xs text-[#6E5E48]">
            <span className="opt-brand text-[#6E5E48]">
              <span className="opt">OPT</span><span>ionality</span>
            </span>
            {" "}· Free to use · No guaranteed placement · Always talk to your DSO first
          </p>
        </FadeIn>
      </section>

      {/* ── Stats (with source citations) ────────────────────────────── */}
      <section className="border-y border-white/[0.08] bg-[#161109] px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, sub, href }, index) => (
            <FadeIn key={label} delay={index * 0.1} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-gradient mb-1">{value}</p>
              <p className="text-sm font-semibold text-[#EDE0CC] mb-0.5">{label}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6E5E48] hover:text-[#C9A96E] transition-colors underline underline-offset-2"
              >
                {sub} ↗
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Founder (research: #2 most important trust signal) ───────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/[0.08]">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Avatar placeholder */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#C9A96E]/30 bg-[#161109] flex items-center justify-center text-2xl">
                📸
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-2">Built by an insider</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#EDE0CC] mb-3 leading-tight">
                Fellow F-1 here. I filed I-765, waited 4.5 months,<br className="hidden md:block" />
                and built the resource I wish existed.
              </h2>
              <p className="text-[#9E8B71] leading-relaxed mb-4 max-w-xl">
                I&apos;m Guillaume — Belgian-Swiss, Kellogg MBA &apos;26, currently on OPT in Chicago.
                When I landed, the DSO handed me a pamphlet and Reddit gave me 15 conflicting answers.
                OPTionality is peer navigation from someone who&apos;s been through it — not an agency,
                not a law firm. I read every reply.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://linkedin.com/in/guillaumegruyters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.10] text-[#9E8B71] text-sm hover:text-white hover:border-white/20 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Guillaume on LinkedIn
                </a>
                <span className="text-xs text-[#6E5E48]">Kellogg MBA &apos;26 · On OPT · Chicago, IL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain Points ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#EDE0CC]">
              OPT is the hardest thing<br className="hidden sm:block" /> nobody prepares you for.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {painPoints.map(({ icon, title, body }, index) => (
              <FadeIn key={title} delay={index * 0.1} className="card-hover rounded-2xl border border-white/[0.08] bg-[#161109] p-7">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="text-lg font-bold text-[#EDE0CC] mb-2">{title}</h3>
                <p className="text-sm text-[#9E8B71] leading-relaxed">{body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offerings ────────────────────────────────────────────────── */}
      <section id="offerings" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#161109] border-y border-white/[0.08]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">The Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#EDE0CC]">Four ways we help you build.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map(({ tier, title, price, timeline, description, features, cta, href, highlight }, index) => (
              <FadeIn
                key={tier}
                delay={index * 0.1}
                className={`card-hover rounded-2xl border p-7 relative ${
                  highlight ? "border-[#C9A96E]/40 bg-[#C9A96E]/5" : "border-white/[0.08] bg-[#1E1812]"
                }`}
              >
                {highlight && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#C9A96E] text-[#0C0A07] text-xs font-bold">
                    Launching first
                  </span>
                )}
                <p className="text-xs font-mono text-[#C9A96E] mb-2">{tier}</p>
                <h3 className="text-xl font-bold text-[#EDE0CC] mb-1">{title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-[#C9A96E]">{price}</span>
                  <span className="text-[#6E5E48] text-xs">·</span>
                  <span className="text-xs text-[#6E5E48]">{timeline}</span>
                </div>
                <p className="text-sm text-[#9E8B71] leading-relaxed mb-5">{description}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#B8A68A]">
                      <span className="text-[#C9A96E] text-base">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    highlight
                      ? "bg-[#C9A96E] text-[#0C0A07] hover:bg-[#D4B882]"
                      : "border border-white/[0.12] text-[#9E8B71] hover:text-white hover:border-white/20"
                  }`}
                >
                  {cta}
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPT Tool CTA ─────────────────────────────────────────────── */}
      <section id="opt-tool" className="px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-10 md:p-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">Free — No signup required</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#EDE0CC] mb-4">
              Know every deadline<br className="hidden sm:block" /> to the exact day.
            </h2>
            <p className="text-[#9E8B71] text-base max-w-xl mx-auto mb-3">
              Enter your graduation date → get your full OPT timeline: OIS windows,
              USCIS deadlines, 90-day unemployment clock, STEM extension dates.
              Color-coded by urgency. Takes 3 minutes.
            </p>
            <p className="text-xs text-[#6E5E48] mb-8">
              Results are based on standard USCIS rules. Always confirm with your DSO.
            </p>
            <Link
              href="/timeline"
              className="inline-block px-7 py-3.5 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-bold text-base hover:bg-[#D4B882] transition-colors shadow-lg shadow-[#C9A96E]/20"
            >
              See my OPT timeline →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Founder Quote ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/[0.08] bg-[#161109]">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-xl md:text-2xl text-[#EDE0CC] font-medium leading-relaxed mb-6 italic">
            &ldquo;I moved across an ocean with a carry-on and a few ideas.
            Turns out that&apos;s enough to start. OPTionality is the resource
            I wish existed when I landed.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 flex items-center justify-center text-sm font-bold text-[#C9A96E]">
              GG
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#EDE0CC]">Guillaume</p>
              <p className="text-xs text-[#6E5E48]">Belgian-Swiss founder · Kellogg MBA &apos;26 · Filed I-765 June 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Waitlist ─────────────────────────────────────────────────── */}
      <section id="waitlist" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">Join 1,000+ F-1 students</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDE0CC] mb-4">Get early access.</h2>
          <p className="text-[#9E8B71] mb-2">
            Be first when the community opens June 15. Refer 3 friends → get a free 1-on-1 with Guillaume.
          </p>
          <p className="text-xs text-[#6E5E48] mb-8">
            We never share your information with employers, USCIS, or your school.
          </p>
          <WaitlistForm />
          <p className="text-xs text-[#6E5E48] mt-3">
            No spam. Unsubscribe anytime. Read our{" "}
            <Link href="/privacy" className="underline hover:text-[#9E8B71] transition-colors">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
