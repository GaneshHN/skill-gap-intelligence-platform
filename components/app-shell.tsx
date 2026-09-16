"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Menu, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { studentRoutes } from "@/lib/navigation"

interface AppShellProps {
  children: React.ReactNode
  title?: string
  description?: string
  backHref?: string
  backLabel?: string
}

export function LevelUpBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="LevelUp home">
      <span className={cn("flex items-center justify-center rounded-lg bg-primary", compact ? "size-8" : "size-9")}>
        <TrendingUp className="size-4 text-primary-foreground" aria-hidden="true" />
      </span>
      <span className={cn("font-bold tracking-tight text-foreground", compact ? "text-lg" : "text-xl")}>LevelUp</span>
    </Link>
  )
}

export function AppShell({ children, title, description, backHref, backLabel = "Back" }: AppShellProps) {
  const pathname = usePathname()
  const activeRoute = studentRoutes.find((route) => route.href === pathname)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-5">
            <LevelUpBrand />
            <div className="hidden h-6 w-px bg-border md:block" />
            <nav className="hidden items-center gap-1 md:flex" aria-label="Student workspace">
              {studentRoutes.slice(0, 4).map((route) => (
                <Link
                  key={route.href}
                  href={route.available ? route.href : "/dashboard"}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-foreground",
                    activeRoute?.href === route.href ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/analyze">Quick Analysis</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open navigation">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>LevelUp workspace</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile workspace navigation">
                  {studentRoutes.map((route) => (
                    <Link key={route.href} href={route.available ? route.href : "/dashboard"} className="rounded-lg px-3 py-3 text-sm text-foreground hover:bg-secondary">
                      <span className="flex items-center justify-between gap-3">
                        {route.label}
                        {!route.available && <Badge variant="secondary">Coming soon</Badge>}
                      </span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {title && (
        <div className="border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {backHref && (
              <Button variant="ghost" size="sm" asChild className="mb-5 -ml-3">
                <Link href={backHref}><ArrowLeft data-icon="inline-start" />{backLabel}</Link>
              </Button>
            )}
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{activeRoute?.label ?? "LevelUp workspace"}</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
