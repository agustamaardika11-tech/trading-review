import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TradingReview - Platform Review Broker Trading Terpercaya",
    template: "%s | TradingReview",
  },
  description:
    "Review broker trading independen, perbandingan broker, kalkulator trading, dan edukasi forex terlengkap di Indonesia.",
  keywords: [
    "review broker",
    "perbandingan broker forex",
    "kalkulator trading",
    "edukasi forex",
    "broker terpercaya",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "TradingReview",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.className} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TradingReview",
              url: "https://tradingreview.id",
              description:
                "Platform review broker trading independen dan terpercaya.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://tradingreview.id/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
