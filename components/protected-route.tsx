"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=/dashboard")
  }, [loading, user, router])
  if (loading || !user) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Loading your workspace...</div>
  return children
}
