"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/news", label: "News" },
  { href: "/tools", label: "Tools" },
  { href: "/advisor", label: "AI Advisor" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0C0A07]/90 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Wordmark */}
        <Link
          href="/"
          className="opt-brand flex items-center gap-0 text-xl font-bold tracking-tight select-none"
        >
          <span className="opt">OPT</span>
          <span className="text-[#EDE0CC]">ionality</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href || pathname.startsWith(href + "/")
                  ? "bg-[#C9A96E]/10 text-[#C9A96E]"
                  : "text-[#9E8B71] hover:text-[#EDE0CC] hover:bg-white/[0.05]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/#waitlist"
            className="px-4 py-2 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors"
          >
            Join waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-[#9E8B71] hover:text-white hover:bg-white/[0.05]"
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
        <div className="md:hidden border-t border-white/[0.08] bg-[#161109] px-4 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href || pathname.startsWith(href + "/")
                  ? "bg-[#C9A96E]/10 text-[#C9A96E]"
                  : "text-[#9E8B71] hover:text-[#EDE0CC] hover:bg-white/[0.05]"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/#waitlist"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-[#C9A96E] text-[#0C0A07] text-sm font-semibold hover:bg-[#D4B882] transition-colors"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
