"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Practice Areas", href: "/practices" },
  { name: "Team", href: "/attorneys" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
      ? 'border-border bg-background/95 backdrop-blur shadow-sm supports-[backdrop-filter]:bg-background/80'
      : 'border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}>
      <div className="container mx-auto flex h-16 sm:h-20 md:h-28 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group py-1">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/images/licit-axiom-logo-dark.png"
              alt="Licit Axiom Legal Consultants"
              width={280}
              height={220}
              className="h-11 sm:h-14 md:h-24 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            /* Fixed 300px overflows a 320px-wide phone once the sheet's own
               padding is added. Cap it against the viewport instead. */
            className="w-[min(20rem,85vw)] bg-background overflow-y-auto"
          >
            <div className="flex h-full flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <Image
                src="/images/licit-axiom-logo-dark.png"
                alt="Licit Axiom Legal Consultants"
                width={280}
                height={220}
                className="h-14 w-auto object-contain"
              />
              {/* Full-width rows with dividers: each link gets a 48px hit area
                  instead of the ~24px a bare text node would give. */}
              <nav className="mt-6 flex flex-col divide-y divide-border/70">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center text-base font-medium text-foreground transition-colors hover:text-primary active:text-accent"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Button asChild className="mt-8 w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
