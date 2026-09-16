import type { CareerDomain } from "@/lib/domain/types"

export interface AppRoute {
  href: string
  label: string
  description: string
  domain?: CareerDomain
  available: boolean
}

export const publicRoutes: AppRoute[] = [
  { href: "/", label: "Home", description: "LevelUp home", available: true },
  { href: "/analyze", label: "Quick Analysis", description: "Analyze your skill gap", domain: "analysis", available: true },
  { href: "/student-form", label: "Student Registration", description: "Register your department", domain: "profile", available: true },
]

export const studentRoutes: AppRoute[] = [
  { href: "/dashboard", label: "Dashboard", description: "Your career intelligence overview", available: true },
  { href: "/profile", label: "Student Profile", description: "Manage your academic profile", domain: "profile", available: true },
  { href: "/resume", label: "Resume & Skills", description: "Upload and verify resume skills", domain: "resume", available: true },
  { href: "/career", label: "Target Career", description: "Choose your target career", domain: "career", available: true },
  { href: "/roadmap", label: "Learning Roadmap", description: "Follow your personalized roadmap", domain: "roadmap", available: true },
  { href: "/history", label: "Analysis History", description: "Review previous analyses", domain: "history", available: true },
  { href: "/progress", label: "Progress", description: "Track roadmap milestones", domain: "roadmap", available: true },
  { href: "/admin", label: "Admin", description: "Manage the career catalog", available: true },
]

export const quickActionRoutes = [
  { href: "/analyze", label: "Run Quick Skill Analysis", available: true },
  { href: "/student-form", label: "Complete Student Registration", available: true },
]

export function getRouteByHref(href: string) {
  return [...publicRoutes, ...studentRoutes].find((route) => route.href === href)
}
