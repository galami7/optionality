import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#161109] mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="opt-brand text-xl font-bold mb-3">
              <span className="opt">OPT</span>
              <span>ionality</span>
            </div>
            <p className="text-[#9E8B71] text-sm leading-relaxed max-w-xs mb-4">
              Helping F-1 students realize they have more paths than they think.
              Built by a Belgian-Swiss founder who filed I-765 himself.
            </p>

            {/* Trust: data privacy promise */}
            <p className="text-xs text-[#504133] leading-relaxed max-w-xs mb-4 border-l-2 border-[#C9A96E]/30 pl-3">
              We never share your information with employers, USCIS, or your school.
            </p>

            <p className="text-[#6E5E48] text-xs">
              A venture by{" "}
              <a
                href="https://linkedin.com/in/guillaumegruyters"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A96E] hover:underline"
              >
                Guillaume
              </a>{" "}
              · Chicago, IL
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[#EDE0CC] mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-[#9E8B71]">
              <li><Link href="/tools" className="hover:text-[#C9A96E] transition-colors">All Tools</Link></li>
              <li><Link href="/tools/tracker" className="hover:text-[#C9A96E] transition-colors">90-Day Unemployment Tracker</Link></li>
              <li><Link href="/timeline" className="hover:text-[#C9A96E] transition-colors">OPT Timeline Calculator</Link></li>
              <li><Link href="/news" className="hover:text-[#C9A96E] transition-colors">News & Updates</Link></li>
              <li><Link href="/advisor" className="hover:text-[#C9A96E] transition-colors">AI Advisor</Link></li>
              <li><Link href="/about" className="hover:text-[#C9A96E] transition-colors">About Guillaume</Link></li>
              <li><Link href="/privacy" className="hover:text-[#C9A96E] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-[#EDE0CC] mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-[#9E8B71]">
              <li>
                <a
                  href="https://linkedin.com/in/guillaumegruyters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:guillaume@opt-ionality.com" className="hover:text-[#C9A96E] transition-colors">
                  guillaume@opt-ionality.com
                </a>
              </li>
              <li>
                <Link href="/#waitlist" className="hover:text-[#C9A96E] transition-colors">Join Waitlist</Link>
              </li>
            </ul>

            {/* DSO referral note */}
            <div className="mt-5 p-3 rounded-xl bg-[#0C0A07] border border-white/[0.06]">
              <p className="text-xs text-[#6E5E48] leading-relaxed">
                For visa-specific questions, always consult your DSO and a licensed immigration attorney.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom trust bar — all 8 signals */}
        <div className="border-t border-white/[0.08] pt-6 space-y-3">
          {/* Legal disclaimer — prominent */}
          <div className="p-4 rounded-xl bg-[#0C0A07] border border-white/[0.06]">
            <p className="text-xs text-[#6E5E48] leading-relaxed text-center">
              <span className="font-semibold text-[#9E8B71]">OPTionality is not a law firm and does not provide legal advice.</span>{" "}
              All information is general in nature and not a substitute for advice from a licensed immigration attorney or your Designated School Official (DSO).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#504133]">
            <p>© {new Date().getFullYear()} OPTionality · Chicago, IL · All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#9E8B71] transition-colors">Privacy Policy</Link>
              <a href="mailto:guillaume@opt-ionality.com" className="hover:text-[#9E8B71] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
