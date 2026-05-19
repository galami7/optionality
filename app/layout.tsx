import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OPTionality — Helping F-1 students realize they have more paths than they think",
    template: "%s | OPTionality",
  },
  description:
    "The community and resource hub for international students navigating OPT, launching startups, and building futures in the US.",
  metadataBase: new URL("https://opt-ionality.com"),
  openGraph: {
    siteName: "OPTionality",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@optionalityhq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OPTionality",
              url: "https://opt-ionality.com",
              logo: "https://opt-ionality.com/favicon.ico",
              description: "Helping F-1 students realize they have more paths than they think.",
              founder: {
                "@type": "Person",
                name: "Guillaume"
              }
            })
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
