import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0C0A07] text-[#EDE0CC] antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
