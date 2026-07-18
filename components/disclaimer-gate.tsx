"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const STORAGE_KEY = "licit-axiom-bci-disclaimer-accepted"

export function DisclaimerGate() {
  const [open, setOpen] = useState(false)
  const [declined, setDeclined] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") {
        setOpen(true)
      }
    } catch {
      // localStorage unavailable (private mode etc.) — show the gate anyway
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const handleAgree = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // ignore storage failures
    }
    setOpen(false)
  }

  const handleDecline = () => {
    setDeclined(true)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bci-disclaimer-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex flex-col items-center gap-4 px-6 pt-8 text-center md:px-10">
          <Image
            src="/images/licit-axiom-no-bg-20-281-29.png"
            alt="Licit Axiom"
            width={180}
            height={72}
            className="h-16 w-auto"
            priority
          />
          <h2 id="bci-disclaimer-title" className="font-serif text-2xl font-bold text-foreground">
            Disclaimer
          </h2>
        </div>

        <div className="space-y-4 px-6 py-6 text-sm leading-relaxed text-muted-foreground md:px-10">
          <p>
            The rules of the Bar Council of India prohibit advocates from advertising or soliciting work in any form
            or manner. This website has been created solely for informational purposes and is not intended to be, and
            should not be construed as, an advertisement or solicitation of any kind.
          </p>
          <p>By proceeding further and clicking on the &ldquo;I Agree&rdquo; button below, you acknowledge and confirm that:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              You are seeking information about Licit Axiom, its practice areas and its members, of your own accord
              and for your own use, and there has been no form of solicitation, advertisement, inducement or personal
              communication from Licit Axiom or any of its members inviting you to this website.
            </li>
            <li>
              The information provided on this website is made available to you only on your specific request, and any
              information obtained or material downloaded from this website is completely at your own volition.
            </li>
            <li>
              No content on this website constitutes legal advice, and no lawyer-client relationship is created by
              your use of this website. Licit Axiom shall not be liable for any consequences of any action taken in
              reliance on the material or information provided on this website.
            </li>
          </ul>
          {declined && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 font-medium text-foreground">
              You must accept the disclaimer to access this website. If you do not agree, please close this window or
              navigate away from this site.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border bg-secondary/50 px-6 py-5 sm:flex-row sm:justify-center md:px-10">
          <button
            onClick={handleAgree}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            I Agree
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            I Disagree
          </button>
        </div>
      </div>
    </div>
  )
}
