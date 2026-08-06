import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us | Licit Axiom - Advocates & Solicitors",
  description: "Get in touch with Licit Axiom. Our team of expert advocates and solicitors is ready to assist you with your legal matters across India.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: "Contact Us | Licit Axiom",
    description: "Get in touch with Licit Axiom. Our team of expert advocates and solicitors is ready to assist you with your legal matters across India.",
    locale: "en_IN",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Licit Axiom",
    description: "Get in touch with Licit Axiom. Our team of expert advocates and solicitors is ready to assist you with your legal matters across India.",
    images: ["/og-image.png"],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_URL}/contact`,
      },
    ],
  }

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Licit Axiom",
    description: "Contact information for Licit Axiom law firm.",
    url: `${SITE_URL}/contact`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      {children}
    </>
  )
}
