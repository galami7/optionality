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
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs mb-4">
              Helping F-1 students realize they have more paths than they think.
              Built by a Belgian-Swiss founder who filed I-765 himself.
            </p>

            {/* Trust: data privacy promise */}
            <p className="text-xs text-[#475569] leading-relaxed max-w-xs mb-4 border-l-2 border-[#22C55E]/30 pl-3">
              We never share your information with employers, USCIS, or your school.
            </p>

            <p className="text-[#64748B] text-xs">
              A venture by{" "}
              <a
                href="https://linkedin.com/in/guillaumegruyters"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22C55E] hover:underline"
              >
                Guillaume
              </a>{" "}
              · Gruyters Ventures LLC · Chicago, IL
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link href="/tools" className="hover:text-[#22C55E] transition-colors">All Tools</Link></li>
              <li><Link href="/tools/tracker" className="hover:text-[#22C55E] transition-colors">90-Day Unemployment Tracker</Link></li>
              <li><Link href="/timeline" className="hover:text-[#22C55E] transition-colors">OPT Timeline Calculator</Link></li>
              <li><Link href="/news" className="hover:text-[#22C55E] transition-colors">News & Updates</Link></li>
              <li><Link href="/advisor" className="hover:text-[#22C55E] transition-colors">AI Advisor</Link></li>
              <li><Link href="/about" className="hover:text-[#22C55E] transition-colors">About Guillaume</Link></li>
              <li><Link href="/privacy" className="hover:text-[#22C55E] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <a
                  href="https://linkedin.com/in/guillaumegruyters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#22C55E] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:guillaume@opt-ionality.com" className="hover:text-[#22C55E] transition-colors">
                  guillaume@opt-ionality.com
                </a>
              </li>
              <li>
                <Link href="/#waitlist" className="hover:text-[#22C55E] transition-colors">Join Waitlist</Link>
              </li>
            </ul>

            {/* DSO referral note */}
            <div className="mt-5 p-3 rounded-xl bg-[#080D1A] border border-white/[0.06]">
              <p className="text-xs text-[#64748B] leading-relaxed">
                For visa-specific questions, always consult your DSO and a licensed immigration attorney.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom trust bar — all 8 signals */}
        <div className="border-t border-white/[0.08] pt-6 space-y-3">
          {/* Legal disclaimer — prominent */}
          <div className="p-4 rounded-xl bg-[#080D1A] border border-white/[0.06]">
            <p className="text-xs text-[#64748B] leading-relaxed text-center">
              <span className="font-semibold text-[#94A3B8]">OPTionality is not a law firm and does not provide legal advice.</span>{" "}
              All information is general in nature and not a substitute for advice from a licensed immigration attorney or your Designated School Official (DSO).
              OPTionality is a DBA of Gruyters Ventures LLC, registered in Illinois.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#475569]">
            <p>© {new Date().getFullYear()} Gruyters Ventures LLC · Chicago, IL · All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#94A3B8] transition-colors">Privacy Policy</Link>
              <a href="mailto:guillaume@opt-ionality.com" className="hover:text-[#94A3B8] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
