import type { Metadata } from "next";
import Link from "next/link";
import WaitlistForm from "@/components/waitlist-form";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "OPTionality — Helping F-1 students realize they have more paths than they think",
  description: "Community, tools, and startup infrastructure for F-1 students on OPT.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />
        
        <FadeIn className="mx-auto max-w-4xl text-center relative z-10" direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-300 text-xs font-semibold mb-8 uppercase tracking-widest shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Launching June 2026
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
            <span className="text-white">Don't lose </span>
            <span className="text-gradient block mt-2">your status.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto mb-12 tracking-tight">
            The infrastructure for international students to navigate OPT, launch startups, and secure their future in the US.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/timeline"
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Calculate Timeline
            </Link>
            <a
              href="#waitlist"
              className="px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              Join Waitlist
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── Bento Grid ────────────────────────────────────────────────── */}
      <section className="px-6 py-24 relative z-10">
        <div className="mx-auto max-w-6xl">
          
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">The Platform.</h2>
              <p className="text-zinc-400 text-lg">Everything you need, built by an insider.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 - Large */}
            <FadeIn delay={0.1} className="md:col-span-2 bento-card p-10 flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-4">01 — Community</p>
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Peer Navigation</h3>
                <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                  Join 1,000+ F-1 students. Monthly meetups, resource libraries, and answers that actually make sense. No jargon. No $300 hourly fees.
                </p>
              </div>
              <div className="mt-8">
                <a href="#waitlist" className="text-white font-semibold border-b border-white/30 pb-1 hover:border-white transition-colors">Join free →</a>
              </div>
            </FadeIn>

            {/* Box 2 - Small */}
            <FadeIn delay={0.2} className="bento-card p-10 flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-4">02 — Tools</p>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">OPT Timeline</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Enter your graduation date. Get a color-coded timeline of every USCIS deadline so the clock never catches you.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/timeline" className="text-white font-semibold border-b border-white/30 pb-1 hover:border-white transition-colors">Calculate →</Link>
              </div>
            </FadeIn>

            {/* Box 3 - Small */}
            <FadeIn delay={0.3} className="bento-card p-10 flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-4">03 — Strategy</p>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">1-on-1 Consult</h3>
                <p className="text-zinc-400 leading-relaxed">
                  30-minute deep dives to map your specific runway and evaluate your startup idea's visa viability.
                </p>
              </div>
            </FadeIn>

            {/* Box 4 - Large */}
            <FadeIn delay={0.4} className="md:col-span-2 bento-card p-10 flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-4">04 — Launch</p>
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Founder Cohort</h3>
                <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                  An 8-week accelerator for international founders. LLC setup, banking, W-2 employer of record frameworks, and IP protection.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────── */}
      <section className="py-24 border-y border-white/5 bg-zinc-950/50">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
          {[
            { v: "294K", l: "Active OPT holders" },
            { v: "90", l: "Days to find a job" },
            { v: "36", l: "Months of runway" },
            { v: "1", l: "Place to figure it out" }
          ].map((stat, i) => (
            <FadeIn key={stat.l} delay={i * 0.1} className="text-center">
              <p className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.v}</p>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{stat.l}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Waitlist ─────────────────────────────────────────────────── */}
      <section id="waitlist" className="px-6 py-32">
        <FadeIn direction="up" className="mx-auto max-w-xl text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white font-bold mb-6 shadow-xl">
            GG
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Built by an insider.</h2>
          <p className="text-zinc-400 mb-10 text-lg">
            I'm Guillaume. I filed I-765, waited 4.5 months, and built the resource I wish existed. Get early access.
          </p>
          <div className="p-1.5 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
            <WaitlistForm />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
