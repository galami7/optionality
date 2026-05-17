import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Guillaume — OPTionality",
  description:
    "Meet Guillaume, the Belgian-Swiss founder behind OPTionality. Kellogg MBA '26, currently on OPT, building the community he wished existed when he landed.",
};

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start mb-20">
          {/* Photo + name */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-5">
            {/* Avatar */}
            <div className="w-44 h-56 rounded-3xl overflow-hidden bg-[#161109] border border-white/[0.08]">
              <Image
                src="/avatar.png"
                alt="Guillaume — Founder of OPTionality"
                width={176}
                height={224}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>

            <div>
              <h1 className="font-display text-3xl font-black text-[#EDE0CC] mb-1">Guillaume</h1>
              <p className="text-sm text-[#C9A96E] font-semibold">Founder, OPTionality</p>
              <p className="text-xs text-[#6E5E48] mt-1">Belgian-Swiss · Chicago, IL · On OPT</p>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-2 w-full max-w-[200px]">
              <a
                href="https://linkedin.com/in/guillaumegruyters"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.10] bg-[#161109] text-[#9E8B71] text-sm hover:text-white hover:border-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:guillaume@opt-ionality.com"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.10] bg-[#161109] text-[#9E8B71] text-sm hover:text-white hover:border-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email me
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">The story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#EDE0CC] leading-tight mb-4">
                I moved across an ocean with a carry-on and a few ideas.<br />
                Turns out that&apos;s enough to start.
              </h2>
            </div>

            <div className="space-y-4 text-[#9E8B71] text-base leading-relaxed">
              <p>
                I&apos;m Belgian-Swiss, currently finishing my MBA at Kellogg (Northwestern), and building companies in Chicago —
                all while navigating the OPT system that affects every international student in the US.
              </p>
              <p>
                When I landed, the resources weren&apos;t there. The DSO handed me a pamphlet. Reddit gave me 15 conflicting answers.
                Every immigration attorney wanted $300 just for a 30-minute call. There was no trusted peer source —
                no one who had actually <em className="text-[#EDE0CC]">been through it</em> and could explain what the timeline actually meant.
              </p>
              <p>
                OPTionality is the resource I wish existed. It&apos;s not legal advice — I&apos;m explicit about that.
                It&apos;s peer navigation from someone who has lived it, built in public, with tools that actually help
                you know where you stand.
              </p>
            </div>
          </div>
        </div>

        {/* What I'm building */}
        <div className="mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">What I&apos;m building</p>
          <h2 className="text-2xl font-bold text-[#EDE0CC] mb-8">What I&apos;m building</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "OPTionality",
                status: "Launching June 15, 2026",
                dot: "bg-[#C9A96E]",
                desc: "Community, tools, and launchpad for international students navigating OPT and building companies in the US.",
                href: "/",
              },
              {
                name: "DormBasic",
                status: "Launching Sept 2026",
                dot: "bg-[#F59E0B]",
                desc: "Dorm lifestyle brand making wall-safe, tool-free frames under $5. Made for students who actually live in dorms.",
                href: null,
              },
              {
                name: "JobSync",
                status: "Shipping before June 15",
                dot: "bg-blue-400",
                desc: "Job search tooling built for international students — filters for OPT/STEM-friendly employers, timeline sync.",
                href: null,
              },
              {
                name: "EraseAI",
                status: "Shipping before June 15",
                dot: "bg-purple-400",
                desc: "AI-powered content cleanup tool. Details coming soon.",
                href: null,
              },
            ].map(({ name, status, dot, desc, href }) => (
              <div key={name} className="rounded-2xl border border-white/[0.08] bg-[#161109] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-xs text-[#6E5E48]">{status}</span>
                </div>
                <h3 className="text-base font-bold text-[#EDE0CC] mb-2">{name}</h3>
                <p className="text-sm text-[#9E8B71] leading-relaxed mb-3">{desc}</p>
                {href && (
                  <Link href={href} className="text-xs text-[#C9A96E] hover:underline">
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* O-1 transparency block */}
        <div className="rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-8 mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-3">Full transparency</p>
          <h3 className="text-lg font-bold text-[#EDE0CC] mb-3">
            Building OPTionality is also building my O-1 case.
          </h3>
          <p className="text-[#9E8B71] text-sm leading-relaxed">
            I&apos;m being transparent about this because I think more founders should be: everything I&apos;m doing here —
            the community building, the people helped, the cohorts run, the press coverage earned — maps to O-1 extraordinary ability evidence.
            I believe the best way to build a compelling immigration case is to actually do compelling work. OPTionality is real, the mission is real,
            and the O-1 strategy runs alongside it — not instead of it.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#9E8B71] mb-6 text-lg">Want to talk?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#waitlist"
              className="px-6 py-3 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-semibold hover:bg-[#D4B882] transition-colors"
            >
              Join the waitlist →
            </Link>
            <a
              href="mailto:guillaume@opt-ionality.com"
              className="px-6 py-3 rounded-xl border border-white/[0.12] text-[#9E8B71] font-medium hover:text-white hover:border-white/20 transition-colors"
            >
              Send me an email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
