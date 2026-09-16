"use client"

import { useEffect, useState } from "react"
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getCareerRoles, getRoleSkills, formatImportance, type CareerRole, type RoleSkill } from "@/lib/career-intelligence"

export default function RoadmapPage() {
  const [role, setRole] = useState<CareerRole>()
  const [skills, setSkills] = useState<RoleSkill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const [{ data: profile }, roles] = await Promise.all([
          supabase.from("profiles").select("target_career").maybeSingle(),
          getCareerRoles(),
        ])
        const target = roles.find((item) => item.key === profile?.target_career) ?? roles[0]
        if (target) { setRole(target); setSkills(await getRoleSkills(target.id)) }
      } catch { setError("Your roadmap is unavailable right now.") }
      finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <AppShell title="Learning Roadmap" description="A skill-by-skill path built from your selected career direction." backHref="/career" backLabel="Target Career">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {loading ? <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" />Building your roadmap...</div> : error ? <Card><CardContent className="pt-6 text-sm text-destructive">{error}</CardContent></Card> : !role ? <Card><CardContent className="pt-6"><CardTitle>Choose a target career first</CardTitle><CardDescription className="mt-2">Select a career to generate a learning roadmap.</CardDescription></CardContent></Card> : <div className="flex flex-col gap-8">
          <Card className="border-primary/20 bg-primary/5"><CardHeader><Badge className="w-fit">{role.category}</Badge><CardTitle className="text-2xl">{role.title} roadmap</CardTitle><CardDescription>{role.description} Start with critical foundations, then build the supporting skills employers expect.</CardDescription></CardHeader><CardContent><div className="flex items-center justify-between text-sm"><span className="font-medium">Roadmap progress</span><span className="text-muted-foreground">0/{skills.length} completed</span></div><Progress value={0} className="mt-3" /></CardContent></Card>
          <div className="grid gap-4 md:grid-cols-2">{skills.map((item, index) => <Card key={item.skill_id}><CardHeader><div className="flex items-start gap-4"><div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">{index + 1}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><CardTitle className="text-base">{item.skill?.name ?? "Skill"}</CardTitle><Badge variant={item.importance === "critical" ? "default" : "secondary"}>{formatImportance(item.importance)}</Badge></div><CardDescription className="mt-1">{item.skill?.category ?? "Core competency"}</CardDescription></div></div></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-muted-foreground"><BookOpen className="size-4" />Learn, practice, then verify this skill in your profile.</div></CardContent></Card>)}</div>
          {skills.length === 0 && <Card><CardContent className="flex items-center gap-3 pt-6 text-muted-foreground"><CheckCircle2 className="size-5" />No roadmap skills are available yet for this role.</CardContent></Card>}
        </div>}
      </main>
    </AppShell>
  )
}
