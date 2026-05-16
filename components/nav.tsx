"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/advisor", label: "AI Advisor" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080D1A]/90 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Wordmark */}
        <Link href="/" className="opt-brand flex items-center gap-0.5 text-xl font-bold tracking-tight select-none">
          <span className="opt">OPT</span>
          <span className="text-[#F8FAFC]">ionality</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-[#22C55E]/10 text-[#22C55E]"
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#waitlist"
            className="px-4 py-2 rounded-lg bg-[#22C55E] text-[#080D1A] text-sm font-semibold hover:bg-[#4ADE80] transition-colors"
          >
            Join the waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0F1729] px-4 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-[#22C55E]/10 text-[#22C55E]"
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/#waitlist"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-[#22C55E] text-[#080D1A] text-sm font-semibold hover:bg-[#4ADE80] transition-colors"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
