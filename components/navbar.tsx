"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, TrendingUp } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">LevelUp</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </Link>
            <Link href="/analyze" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Analyze
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button size="sm" asChild>
            <Link href="/analyze">Get Started</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="/analyze"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Analyze
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <div className="flex gap-3 pt-2">
              <Button size="sm" className="flex-1" asChild>
                <Link href="/analyze">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
