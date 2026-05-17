import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, categoryColors, formatDate, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News & Updates — OPT Policy, Employer Tracker, Founder Stories",
  description:
    "Stay current on OPT processing times, USCIS policy changes, employer OPT sponsorship updates, and international founder stories. The authoritative source for F-1 OPT news.",
  openGraph: {
    title: "OPTionality News — OPT Policy, Employer Tracker, Founder Stories",
    description: "The authoritative source for F-1 OPT news and international founder stories.",
  },
};

const categories: Array<Post["category"] | "All"> = [
  "All",
  "OPT Updates",
  "Startup Stories",
  "Policy & Law",
  "Resources",
  "Community",
];

export default function NewsPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">News & Updates</p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#EDE0CC] mb-4">
            The OPT intelligence hub.
          </h1>
          <p className="text-[#9E8B71] text-lg max-w-xl">
            Policy updates, employer tracker, processing times, and founder stories — all in one place.
            Written for F-1 students, by someone on OPT.
          </p>
        </div>

        {/* Category filter — static labels for now, filtering requires client component */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-default ${
                cat === "All"
                  ? "border-[#C9A96E]/40 bg-[#C9A96E]/10 text-[#C9A96E]"
                  : "border-white/[0.08] bg-[#161109] text-[#9E8B71]"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Featured posts */}
        {featured.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6E5E48] mb-5">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        )}

        {/* All posts */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6E5E48] mb-5">Latest</h2>
          <div className="flex flex-col gap-4">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* SEO / GEO credibility block */}
        <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#161109] p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">About this publication</p>
          <p className="text-[#9E8B71] text-sm max-w-xl mx-auto leading-relaxed">
            OPTionality publishes original reporting on F-1 OPT policy, USCIS data, employer OPT participation,
            and international founder journeys. All articles are written or reviewed by Guillaume, a
            Belgian-Swiss founder currently on OPT (Kellogg MBA &apos;26). This is peer navigation — not legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <article
        className={`card-hover rounded-2xl border border-white/[0.08] bg-[#161109] p-6 h-full ${
          featured ? "md:p-8" : ""
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
            {post.category}
          </span>
          <span className="text-[#504133] text-xs">{post.readingTime}</span>
        </div>
        <h3
          className={`font-bold text-[#EDE0CC] group-hover:text-[#C9A96E] transition-colors mb-2 leading-snug ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p className="text-[#9E8B71] text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-[#504133]">
          <span>{post.author}</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </article>
    </Link>
  );
}
