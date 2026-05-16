export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: "OPT Updates" | "Startup Stories" | "Policy & Law" | "Community" | "Resources";
  readingTime: string;
  featured?: boolean;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "uscis-opt-processing-times-2026",
    title: "USCIS OPT Processing Times Are Longer Than Ever — Here's What to Do",
    excerpt:
      "Processing times have stretched to 4–5 months at some service centers. Here's the current data, which centers are faster, and exactly how to protect yourself from gaps.",
    date: "2026-05-10",
    author: "Guillaume Gruyters",
    category: "OPT Updates",
    readingTime: "6 min read",
    featured: true,
    body: `
<h2>Where We Are in May 2026</h2>
<p>USCIS OPT processing times as of May 2026 range from <strong>3 to 5 months</strong> depending on the service center handling your case. The Texas Service Center is running around 3.5 months; the Nebraska Service Center closer to 4.5. If you're a May 2026 graduate and haven't filed yet, read this carefully.</p>

<h2>The 90-Day Unemployment Clock vs. Processing Delays</h2>
<p>Here's the trap: OPT is approved for a start date on or after your graduation date. But USCIS processing takes months. If your OPT start date is June 15 and USCIS doesn't approve until September, you still started burning unemployment days on June 15 — even though you had no card in hand.</p>
<p>The fix: <strong>file as early as your OIS will allow</strong> (typically 90 days before graduation) and request the earliest possible start date. Many students request a start date 60 days post-graduation to build a buffer for approval.</p>

<h2>Which Service Center Is Processing Your Case?</h2>
<p>You can check your receipt notice (Form I-797) for the service center. Check current processing times at <a href="https://egov.uscis.gov/processing-times/">egov.uscis.gov/processing-times</a> — search for "OPT" under "I-765, Application for Employment Authorization."</p>

<h2>If You're Cutting It Close</h2>
<ul>
  <li>File a service request after the published processing time has passed on your case</li>
  <li>Contact your congressperson's office for a congressional inquiry — this genuinely speeds things up</li>
  <li>Do not start working before receiving your physical EAD card</li>
  <li>Use the USCIS e-Request portal to check status and file inquiries</li>
</ul>

<blockquote>Peer note from Guillaume: I filed 89 days before graduation, requested a start date 30 days post-graduation, and still waited 4.5 months. My EAD arrived 2 weeks before I could legally start. File early. Build buffer.</blockquote>
    `,
  },
  {
    slug: "stem-opt-extension-guide-2026",
    title: "The Complete STEM OPT Extension Guide for 2026 Graduates",
    excerpt:
      "STEM OPT adds 24 months to your runway — but the filing window, E-Verify requirement, and I-983 reporting are all traps. This is the plain-English walkthrough.",
    date: "2026-04-28",
    author: "Guillaume Gruyters",
    category: "Resources",
    readingTime: "8 min read",
    featured: true,
    body: `
<h2>What STEM OPT Actually Is</h2>
<p>STEM OPT is a 24-month extension of standard OPT, available to students whose degree is in a STEM field listed on the <a href="https://www.ice.gov/doclib/sevis/pdf/stemList2022.pdf">DHS STEM Designated Degree Program List</a>. If your field qualifies and your employer is enrolled in E-Verify, you can extend from 12 months to 36 months total.</p>

<h2>The Four Requirements Nobody Warns You About</h2>
<ul>
  <li><strong>E-Verify enrollment:</strong> Your employer must be actively enrolled in E-Verify. Not just registered — actively enrolled. Verify this before accepting an offer if STEM extension is part of your plan.</li>
  <li><strong>I-983 Training Plan:</strong> You and your employer must complete Form I-983 (Training Plan for STEM OPT Students). This form details your role, supervisor, and how the work relates to your degree.</li>
  <li><strong>File within 90 days of OPT expiry:</strong> File your STEM extension application (another I-765) no earlier than 90 days before your standard OPT expires.</li>
  <li><strong>180-day cap gap rule:</strong> If your extension is pending when standard OPT expires, you're covered for up to 180 additional days. You can keep working. Do not stop.</li>
</ul>

<h2>The I-983 in Practice</h2>
<p>The I-983 is where most people get tripped up. Your employer signs off on a training plan that must demonstrate a "bona fide employer-employee relationship" and work in your field of study. Startups and self-employment are tricky here — the work must genuinely connect to your degree, and the relationship must be arm's-length. If you're self-employed, speak to an immigration attorney before filing.</p>

<blockquote>Bottom line: STEM OPT is 24 extra months. Don't leave it on the table. But file it seriously — the I-983 is not a rubber stamp.</blockquote>
    `,
  },
  {
    slug: "f1-founder-stories-arjun-sharma",
    title: "He Built a $2M ARR Company on a Student Visa. Here's Exactly How.",
    excerpt:
      "Arjun Sharma (Wharton MBA '24) launched a B2B SaaS on F-1 OPT, structured his cap table to stay compliant, and closed his first $500K round before his card expired. A full breakdown.",
    date: "2026-04-15",
    author: "Guillaume Gruyters",
    category: "Startup Stories",
    readingTime: "10 min read",
    body: `
<h2>The Setup</h2>
<p>Arjun arrived in Philadelphia from Mumbai for his Wharton MBA in 2022. By his second year, he had a working prototype of a supply chain visibility tool — and a spreadsheet of 12 paying pilots. The problem: he was on F-1, couldn't take external salary, and had 18 months until graduation.</p>

<h2>The Structure He Used</h2>
<p>Arjun did something most F-1 founders don't know is possible: he structured himself as an <strong>independent contractor through the university's incubator program</strong>, keeping income within the bounds of CPT. This isn't available everywhere — but check with your OIS whether your school has a similar arrangement.</p>
<p>After graduation, he filed for OPT immediately and used the 90-day window to hire himself through an employer-of-record service while his LLC was pending state approval.</p>

<h2>The Cap Table Play</h2>
<p>Critical detail: Arjun held only <strong>voting preferred shares</strong>, not common stock, during OPT. This was intentional — his immigration attorney advised that certain equity structures can complicate "employer-employee relationship" tests if USCIS ever audits an OPT self-employment claim. He converted to common at Series Seed.</p>

<h2>What He'd Tell You</h2>
<ul>
  <li>File OPT the day your OIS window opens. Not a day later.</li>
  <li>Hire an immigration attorney before you structure anything. $500 now saves $50,000 in problems later.</li>
  <li>STEM extension is your friend — plan your first 12 months around getting to E-Verify-eligible employment by month 10.</li>
  <li>Don't let visa anxiety stop you from building. The structure exists. Learn it.</li>
</ul>
    `,
  },
  {
    slug: "opt-employment-tracker-may-2026",
    title: "OPT Employer Tracker — May 2026: Who's Hiring, Who's Paused",
    excerpt:
      "This month: Google reinstated OPT sponsorship for New Grad SWE, Amazon scaled back STEM OPT renewals in AWS, and three Chicago-area startups added E-Verify. Full tracker inside.",
    date: "2026-05-01",
    author: "Guillaume Gruyters",
    category: "OPT Updates",
    readingTime: "5 min read",
    body: `
<h2>What This Tracker Is</h2>
<p>Every month we compile community-sourced and publicly available data on which employers are actively hiring OPT/STEM OPT holders, which have paused, and which have newly enrolled in E-Verify. This is a community resource — not legal advice, not guaranteed to be current. Always verify directly with the employer's HR or your DSO.</p>

<h2>New This Month: Active OPT Sponsorship</h2>
<ul>
  <li><strong>Google:</strong> Reinstated OPT sponsorship for New Grad SWE roles (L3). Confirmed via recruiter outreach. E-Verify: Yes.</li>
  <li><strong>Salesforce:</strong> Actively hiring OPT for product roles in Chicago and SF. STEM OPT renewals confirmed for current employees.</li>
  <li><strong>Citadel:</strong> Hiring OPT for quant roles. Known to sponsor H-1B for strong performers — a pipeline worth noting.</li>
</ul>

<h2>Paused or Reduced</h2>
<ul>
  <li><strong>Amazon AWS:</strong> STEM OPT renewals reduced for non-engineering roles. Standard OPT still active for SDE and PM.</li>
  <li><strong>Meta:</strong> Headcount freeze in place through Q3. OPT positions still posted but moving slowly.</li>
</ul>

<h2>Chicago Startups — New E-Verify Enrollments</h2>
<ul>
  <li>Fieldwork (Series A, logistics tech) — newly E-Verify enrolled as of April 2026</li>
  <li>Locale AI (seed, real estate analytics) — E-Verify confirmed</li>
  <li>Packsmith (pre-seed, CPG SaaS) — enrolled March 2026</li>
</ul>

<blockquote>Know of a change we missed? Email us at community@opt-ionality.com and we'll update the tracker.</blockquote>
    `,
  },
  {
    slug: "self-employment-opt-what-you-need-to-know",
    title: "Self-Employment on OPT: What's Actually Legal in 2026",
    excerpt:
      "Can you start a company on OPT? Yes — but the structure matters more than the idea. Here's the plain-English breakdown of what USCIS looks for and how to do it right.",
    date: "2026-03-20",
    author: "Guillaume Gruyters",
    category: "Policy & Law",
    readingTime: "7 min read",
    body: `
<h2>The Short Answer</h2>
<p>Yes, you can be self-employed on OPT — including as a founder of your own LLC. But the structure has to satisfy a specific test that most people don't know about: the <strong>"bona fide employer-employee relationship"</strong> test.</p>

<h2>What USCIS Actually Looks For</h2>
<p>USCIS requires that your OPT employment involve a genuine employer-employee relationship. For self-employment through an LLC, this means:</p>
<ul>
  <li>The LLC must be a legitimate registered entity with an EIN</li>
  <li>There must be evidence that the LLC controls and directs your work (board resolutions, operating agreements)</li>
  <li>You must be compensated (no unpaid "sweat equity" arrangements during OPT)</li>
  <li>The work must be in your field of study</li>
  <li>You must work 20+ hours per week</li>
</ul>

<h2>The Gray Areas</h2>
<p>This gets complicated fast. If you own 100% of the LLC, USCIS may scrutinize whether you're truly acting as an employee vs. just running your own shop. The solution most immigration attorneys recommend: establish a formal board (even a one-person board), write resolutions, pay yourself via payroll (not owner's draw), and document everything.</p>

<h2>Before You File</h2>
<p>Talk to an immigration attorney before you set up the LLC for OPT purposes. A one-hour consultation (~$300–500) is worth every dollar. The structure you set up in month one will determine whether USCIS has questions in month 12.</p>

<blockquote>OPTionality note: Guillaume set up Gruyters Ventures LLC as his OPT employer on June 15, 2026. He'll document the full process in a future post.</blockquote>
    `,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export const categoryColors: Record<Post["category"], string> = {
  "OPT Updates": "bg-[#22C55E]/10 text-[#22C55E]",
  "Startup Stories": "bg-[#F59E0B]/10 text-[#F59E0B]",
  "Policy & Law": "bg-blue-500/10 text-blue-400",
  "Community": "bg-purple-500/10 text-purple-400",
  "Resources": "bg-cyan-500/10 text-cyan-400",
};

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
