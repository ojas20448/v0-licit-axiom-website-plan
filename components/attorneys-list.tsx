'use client'

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Scale } from "lucide-react"

interface Attorney {
  id: string
  slug: string
  name: string
  title: string
  image: string
  email: string
  phone: string
  practiceAreas: string[]
  education: string[]
  experience: string
  bio: string
  publications: string[]
}

interface AttorneysListProps {
  initialAttorneys: Attorney[]
}

// Helper to get normalized name without titles for alphabetical operations
const getNormalizedName = (name: string) => {
  return name.replace(/^(Mr\.|Mr|Ms\.|Ms|Mrs\.|Mrs|Dr\.|Dr)\s+/i, "").trim()
}

const isPartner = (attorney: Attorney) => attorney.title.toLowerCase().includes("partner")

const byNormalizedName = (a: Attorney, b: Attorney) =>
  getNormalizedName(a.name).toLowerCase().localeCompare(getNormalizedName(b.name).toLowerCase())

function AttorneyCard({ attorney, index }: { attorney: Attorney; index: number }) {
  const cleanName = attorney.name.replace(/^(Mr\.|Mr|Ms\.|Ms|Mrs\.|Mrs|Dr\.|Dr)\s+/i, "").trim()
  const nameParts = cleanName.split(" ").filter(Boolean)
  const initials = nameParts.length >= 2
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
    : cleanName.slice(0, 2).toUpperCase()
  const hasRealImage = attorney.image && !attorney.image.includes("placeholder")

  return (
    <motion.div
      key={attorney.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/attorneys/${attorney.slug}`} className="group h-full block">
        <Card className="h-full overflow-hidden bg-card transition-all hover:shadow-lg border border-border group-hover:border-accent/40 flex flex-col justify-between">
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-950 via-primary to-slate-900 flex flex-col items-center justify-center border-b border-accent/20">
            <Scale className="absolute -right-3 -bottom-3 h-28 w-28 text-accent/5 -rotate-12 pointer-events-none" />
            {hasRealImage ? (
              <Image
                src={attorney.image}
                alt={attorney.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 z-10">
                <div className="h-16 w-16 rounded-full bg-accent/15 border-2 border-accent/60 flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-accent group-hover:scale-105 transition-all duration-300">
                  <span className="font-serif text-xl font-bold text-accent tracking-wider">
                    {initials}
                  </span>
                </div>
                <span className="text-[9px] tracking-widest text-accent/80 font-mono uppercase">
                  Licit Axiom
                </span>
              </div>
            )}
          </div>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                {attorney.name}
              </h2>
              <p className="text-xs font-semibold tracking-wider text-accent uppercase">{attorney.title}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
              <p className="line-clamp-2">
                <span className="font-semibold text-foreground">Practice Areas:</span>{" "}
                {attorney.practiceAreas.length > 0 ? attorney.practiceAreas.join(", ") : "—"}
              </p>
              <p>
                <span className="font-semibold text-foreground">Experience:</span> {attorney.experience}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      <div className="h-px flex-1 bg-border" />
      {subtitle && <span className="text-sm text-muted-foreground">{subtitle}</span>}
    </div>
  )
}

export function AttorneysList({ initialAttorneys }: AttorneysListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL")

  // Generate alphabet list (A-Z)
  const alphabet = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
  }, [])

  // Process and sort attorneys alphabetically
  const sortedAttorneys = useMemo(() => {
    return [...initialAttorneys].sort(byNormalizedName)
  }, [initialAttorneys])

  const partners = useMemo(() => sortedAttorneys.filter(isPartner), [sortedAttorneys])
  const team = useMemo(() => sortedAttorneys.filter((a) => !isPartner(a)), [sortedAttorneys])

  // Get active letters that actually have team members
  const lettersWithMembers = useMemo(() => {
    const letters = new Set<string>()
    sortedAttorneys.forEach((attorney) => {
      const cleanName = getNormalizedName(attorney.name)
      if (cleanName.length > 0) {
        letters.add(cleanName[0].toUpperCase())
      }
    })
    return letters
  }, [sortedAttorneys])

  const isFiltering = searchTerm.trim() !== "" || selectedLetter !== "ALL"

  // Filter attorneys based on search term and selected letter
  const filteredAttorneys = useMemo(() => {
    return sortedAttorneys.filter((attorney) => {
      const cleanName = getNormalizedName(attorney.name)
      const firstLetter = cleanName.length > 0 ? cleanName[0].toUpperCase() : ""

      // Alphabet filter
      if (selectedLetter !== "ALL" && firstLetter !== selectedLetter) {
        return false
      }

      // Search term filter
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase()
        const matchesName = attorney.name.toLowerCase().includes(query)
        const matchesTitle = attorney.title.toLowerCase().includes(query)
        const matchesPractice = attorney.practiceAreas.some((p) =>
          p.toLowerCase().includes(query)
        )
        return matchesName || matchesTitle || matchesPractice
      }

      return true
    })
  }, [sortedAttorneys, selectedLetter, searchTerm])

  return (
    <div className="space-y-8">
      {/* Search and Alphabet Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, title, or practice area..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground w-full md:w-auto text-center md:text-right font-medium">
            Showing {filteredAttorneys.length} of {sortedAttorneys.length} team members
          </div>
        </div>

        {/* Alphabet Selection */}
        <div className="border-t border-border/55 pt-6">
          <p className="text-sm font-medium text-foreground mb-3">Filter by Alphabet:</p>
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            <button
              onClick={() => setSelectedLetter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedLetter === "ALL"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-transparent hover:bg-secondary text-muted-foreground"
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => {
              const hasMembers = lettersWithMembers.has(letter)
              return (
                <button
                  key={letter}
                  disabled={!hasMembers}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    selectedLetter === letter
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : hasMembers
                      ? "bg-transparent hover:bg-secondary text-foreground hover:text-accent"
                      : "bg-transparent text-muted-foreground/30 cursor-not-allowed"
                  }`}
                  title={hasMembers ? `Show members starting with ${letter}` : `No members starting with ${letter}`}
                >
                  {letter}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filtered results (search or alphabet filter active) */}
      {isFiltering ? (
        filteredAttorneys.length > 0 ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredAttorneys.map((attorney, index) => (
                <AttorneyCard key={attorney.id} attorney={attorney} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-card border border-border rounded-xl shadow-sm"
          >
            <p className="text-lg text-muted-foreground">No team members match your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedLetter("ALL")
              }}
              className="mt-4 text-sm font-semibold text-accent hover:underline"
            >
              Clear Filters
            </button>
          </motion.div>
        )
      ) : (
        <>
          {/* Partners Section */}
          {partners.length > 0 && (
            <div className="space-y-6">
              <SectionHeading title="Partners" />
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {partners.map((attorney, index) => (
                    <AttorneyCard key={attorney.id} attorney={attorney} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Rest of the Team (alphabetical) */}
          {team.length > 0 && (
            <div className="space-y-6 pt-4">
              <SectionHeading title="Our Professionals" />
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {team.map((attorney, index) => (
                    <AttorneyCard key={attorney.id} attorney={attorney} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
