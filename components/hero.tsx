"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background glow effect */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Badge variant="outline" className="mb-6 gap-1.5 border-primary/30 bg-primary/5 px-3 py-1.5 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Career Intelligence
        </Badge>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          From Skill Confusion to{" "}
          <span className="text-primary">Career Clarity</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Analyze your skills against industry benchmarks, detect gaps instantly,
          and get a personalized roadmap to become job-ready. Think of it as
          Google Maps for your career growth.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 px-8 text-base" asChild>
            <Link href="/analyze">
              Analyze My Skills
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="gap-2 px-8 text-base" asChild>
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
          <div>
            <p className="text-2xl font-bold text-foreground md:text-3xl">50+</p>
            <p className="mt-1 text-sm text-muted-foreground">Roles Supported</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground md:text-3xl">200+</p>
            <p className="mt-1 text-sm text-muted-foreground">Skills Tracked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground md:text-3xl">Free</p>
            <p className="mt-1 text-sm text-muted-foreground">To Get Started</p>
          </div>
        </div>
      </div>
    </section>
  )
}
