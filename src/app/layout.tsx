import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Licit Axiom Legal Consultants | Expert Legal Counsel",
    template: "%s | Licit Axiom Legal Consultants",
  },
  description: "Licit Axiom Legal Consultants provides expert legal services in corporate law, M&A, employment law, intellectual property, real estate, and dispute resolution. Trusted legal partners for businesses across India.",
  keywords: ["law firm", "legal consultants", "corporate law", "M&A", "employment law", "intellectual property", "Mumbai lawyers", "India law firm"],
  authors: [{ name: "Licit Axiom Legal Consultants" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://licitaxiom.com",
    siteName: "Licit Axiom Legal Consultants",
    title: "Licit Axiom Legal Consultants | Expert Legal Counsel",
    description: "Expert legal services for businesses. Corporate law, M&A, employment, IP, real estate, and dispute resolution.",
    images: [
      {
        url: "/logo.png",
        width: 240,
        height: 90,
        alt: "Licit Axiom Legal Consultants",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="pt-24 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
