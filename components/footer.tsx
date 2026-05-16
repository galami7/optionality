import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0F1729] mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="opt-brand text-xl font-bold mb-3">
              <span className="opt">OPT</span>
              <span>ionality</span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
              Helping F-1 students realize they have more paths than they think.
              Built by an international founder, for international founders.
            </p>
            <p className="text-[#94A3B8] text-xs mt-4">
              A venture by{" "}
              <a
                href="https://linkedin.com/in/guillaumegruyters"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22C55E] hover:underline"
              >
                Guillaume Gruyters
              </a>{" "}
              · Gruyters Ventures LLC
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link href="/news" className="hover:text-[#22C55E] transition-colors">News & Updates</Link></li>
              <li><Link href="/advisor" className="hover:text-[#22C55E] transition-colors">AI Advisor</Link></li>
              <li><Link href="/#opt-tool" className="hover:text-[#22C55E] transition-colors">OPT Timeline Tool</Link></li>
              <li><Link href="/#offerings" className="hover:text-[#22C55E] transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#22C55E] transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:guillaume@opt-ionality.com" className="hover:text-[#22C55E] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/#waitlist" className="hover:text-[#22C55E] transition-colors">Join Waitlist</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Gruyters Ventures LLC. All rights reserved.</p>
          <p className="italic">
            Peer navigation only — not legal advice. Always consult a licensed immigration attorney.
          </p>
        </div>
      </div>
    </footer>
  );
}
