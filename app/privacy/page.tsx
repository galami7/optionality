import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — OPTionality",
  description: "How OPTionality collects, uses, and protects your information.",
};

const LAST_UPDATED = "May 16, 2026";

export default function PrivacyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-10">
          <Link href="/" className="hover:text-[#22C55E] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#94A3B8]">Privacy Policy</span>
        </nav>

        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-3">Legal</p>
          <h1 className="text-4xl font-black text-[#F8FAFC] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#64748B]">Last updated: {LAST_UPDATED}</p>
        </header>

        {/* Core promise — above the fold */}
        <div className="mb-10 p-6 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/5">
          <p className="text-sm font-semibold text-[#F8FAFC] mb-2">The short version</p>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            We collect only what we need to run OPTionality. We never sell your data. We never share
            your information with employers, USCIS, your school, or any government entity. You can
            delete your data at any time by emailing{" "}
            <a href="mailto:guillaume@opt-ionality.com" className="text-[#22C55E] hover:underline">
              guillaume@opt-ionality.com
            </a>
            .
          </p>
        </div>

        <div className="article-body space-y-8">
          <section>
            <h2>Who we are</h2>
            <p>
              OPTionality is a DBA (doing business as) of <strong>Gruyters Ventures LLC</strong>, an Illinois
              limited liability company. Our principal place of business is Chicago, IL. You can reach us at{" "}
              <a href="mailto:guillaume@opt-ionality.com">guillaume@opt-ionality.com</a>.
            </p>
            <p>
              OPTionality is not a law firm. Nothing on this site constitutes legal advice.
              Always consult your DSO and a licensed immigration attorney for questions specific to your visa status.
            </p>
          </section>

          <section>
            <h2>What we collect and why</h2>

            <h3>Email address (waitlist and newsletter)</h3>
            <p>
              When you join our waitlist or newsletter, we collect your email address. We use this to:
            </p>
            <ul>
              <li>Send you OPTionality updates, news, and deadline reminders you asked for</li>
              <li>Notify you when the community launches</li>
              <li>Send our newsletter if you subscribed</li>
            </ul>
            <p>
              We do not use your email to identify you to employers, USCIS, your school, or any third party.
              Your SEVIS ID, I-20, EAD number, or any immigration document is never requested or stored.
            </p>

            <h3>Usage data (analytics)</h3>
            <p>
              We may collect anonymized, aggregated usage data (pages visited, time on site) to improve the
              OPTionality tools and content. This data cannot be used to identify you individually.
              If we use a third-party analytics provider, we will update this policy with details.
            </p>

            <h3>Timeline tool inputs</h3>
            <p>
              The OPT Timeline Calculator runs entirely in your browser. Your graduation date, school name,
              and degree information are <strong>not sent to our servers</strong> and are not stored.
            </p>

            <h3>AI Advisor conversations</h3>
            <p>
              Conversations with the AI Advisor may be logged to improve the knowledge base. Do not include
              personally identifying information (your name, A-Number, SEVIS ID, passport number) in your
              questions. If a question is escalated to Guillaume for a human response, only the question text
              is shared — never linked to your email unless you explicitly choose to identify yourself.
            </p>
          </section>

          <section>
            <h2>What we never do</h2>
            <ul>
              <li>Sell your data to anyone</li>
              <li>Share your information with employers or job platforms</li>
              <li>Share your information with USCIS, ICE, or any government entity</li>
              <li>Share your information with your school or DSO</li>
              <li>Use your data to make automated decisions about your visa eligibility</li>
              <li>Store immigration document numbers (A-Number, SEVIS ID, EAD, passport)</li>
            </ul>
          </section>

          <section>
            <h2>How we store and protect your data</h2>
            <p>
              Email addresses collected through the waitlist are stored in Supabase, a SOC 2 Type II
              certified database provider. Data is encrypted in transit (TLS) and at rest.
              Newsletter data is processed through Beehiiv, which maintains its own privacy policy
              available at beehiiv.com.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate data</li>
              <li><strong>Delete</strong> your data at any time</li>
              <li><strong>Unsubscribe</strong> from any communication via the link in every email</li>
              <li><strong>Port</strong> your data to another service</li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:guillaume@opt-ionality.com">guillaume@opt-ionality.com</a> with the subject
              line "Privacy Request." We will respond within 7 business days.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              OPTionality currently uses no tracking cookies. If this changes, we will update this policy
              and add a cookie consent notice before implementing any tracking.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              If we make material changes to this policy, we will notify subscribers by email and update
              the "Last updated" date above. Continued use of OPTionality after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about this policy or your data:{" "}
              <a href="mailto:guillaume@opt-ionality.com">guillaume@opt-ionality.com</a>
              <br />
              Gruyters Ventures LLC · Chicago, IL
            </p>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.08]">
          <Link href="/" className="text-sm text-[#94A3B8] hover:text-[#22C55E] transition-colors">
            ← Back to OPTionality
          </Link>
        </div>
      </div>
    </div>
  );
}
