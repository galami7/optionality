import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug, categoryColors, formatDate } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastUpdated ?? post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle,
      url: "https://opt-ionality.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "OPTionality",
      url: "https://opt-ionality.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-10">
            <Link href="/" className="hover:text-[#22C55E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-[#22C55E] transition-colors">News</Link>
            <span>/</span>
            <span className="text-[#94A3B8] truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                {post.category}
              </span>
              <span className="text-[#475569] text-xs">{post.readingTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#F8FAFC] leading-tight mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-3 pt-5 border-t border-white/[0.08]">
              <div className="w-9 h-9 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/30 flex items-center justify-center text-xs font-bold text-[#22C55E]">
                GG
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">{post.author}</p>
                <p className="text-xs text-[#64748B]">{post.authorTitle}</p>
                <p className="text-xs text-[#475569] mt-0.5">
                  Published {formatDate(post.date)}
                  {post.lastUpdated && post.lastUpdated !== post.date && (
                    <> · Updated {formatDate(post.lastUpdated)}</>
                  )}
                </p>
              </div>
            </div>
          </header>

          {/* BLUF — At a Glance */}
          {post.bluf && (
            <div className="mb-10 p-5 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E] mb-2">At a glance</p>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{post.bluf}</p>
            </div>
          )}

          {/* Article body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Disclaimer */}
          <div className="mt-12 p-5 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
            <p className="text-xs text-[#F59E0B] font-semibold mb-1">Peer navigation — not legal advice</p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              This article reflects personal experience and publicly available information. It is not legal advice.
              For questions specific to your visa status, consult a licensed immigration attorney.
            </p>
          </div>

          {/* Back link + CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.08]">
            <Link
              href="/news"
              className="text-sm text-[#94A3B8] hover:text-[#22C55E] transition-colors flex items-center gap-1"
            >
              ← Back to News
            </Link>
            <Link
              href="/#waitlist"
              className="px-5 py-2.5 rounded-lg bg-[#22C55E] text-[#080D1A] text-sm font-semibold hover:bg-[#4ADE80] transition-colors"
            >
              Join the OPTionality waitlist →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
