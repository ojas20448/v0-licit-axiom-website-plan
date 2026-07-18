import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PageTransition } from "@/components/page-transition"
import { DisclaimerGate } from "@/components/disclaimer-gate"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT } from "@/lib/site"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Licit Axiom | Expert Legal Services Across India",
  description:
    "Licit Axiom - An integrated legal platform offering a full spectrum of specialized legal services across multiple forums and jurisdictions. Empanelled with ONGC, Coal India, BSNL, and SBI.",
  keywords: "law firm India, law firm Delhi, legal services India, corporate law, litigation, intellectual property, real estate law, taxation India, arbitration, legal consultants India, empanelled lawyers",
  generator: 'v0.app',
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Licit Axiom | Expert Legal Services Across India",
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Licit Axiom - Advocates & Solicitors, New Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Licit Axiom | Expert Legal Services Across India",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: SITE_NAME,
  alternateName: "Licit Axiom LLP",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/images/licit-axiom-no-bg-20-281-29.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    ...CONTACT.address,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Corporate Law",
    "Litigation",
    "Arbitration",
    "Intellectual Property",
    "Mergers & Acquisitions",
    "Real Estate Law",
    "Taxation",
    "Insolvency & Bankruptcy",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
        />
        <DisclaimerGate />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  )
}
