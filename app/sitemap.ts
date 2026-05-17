import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const base = "https://opt-ionality.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/timeline`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/tracker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/stem-checker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/cap-gap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/advisor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
