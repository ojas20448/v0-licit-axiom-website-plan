import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

const navigation = {
  practices: [
    { name: "Corporate Law", href: "/practices/corporate-law" },
    { name: "Mergers & Acquisitions", href: "/practices/mergers-acquisitions" },
    { name: "Litigation", href: "/practices/litigation" },
    { name: "Real Estate", href: "/practices/real-estate" },
  ],
  company: [
    { name: "Team", href: "/attorneys" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/licit-axiom-no-bg-20-281-29.png"
                alt="Licit Axiom Legal Consultants"
                width={220}
                height={88}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Expert legal counsel for businesses and individuals. Trusted advisors in corporate law, M&A, litigation,
              and more.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Practice Areas</h3>
            <ul className="space-y-2">
              {navigation.practices.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  100 Park Avenue, 25th Floor
                  <br />
                  New York, NY 10017
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-primary">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:info@licitaxiom.com" className="text-sm text-muted-foreground hover:text-primary">
                  info@licitaxiom.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Licit Axiom LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
