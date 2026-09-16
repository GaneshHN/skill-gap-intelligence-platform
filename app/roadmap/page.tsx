"use client"

import { useEffect, useState } from "react"
import { BookOpen, CheckCircle2, Circle, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getCareerRoles, getRoleSkills, getOrCreateRoadmap, updateRoadmapItem, formatImportance, type CareerRole, type RoadmapProgressItem } from "@/lib/career-intelligence"

export default function RoadmapPage() {
  const [role, setRole] = useState<CareerRole>()
  const [skills, setSkills] = useState<RoadmapProgressItem[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
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
        if (target) {
          setRole(target)
          const roleSkills = await getRoleSkills(target.id)
          const roadmap = await getOrCreateRoadmap(target.id, roleSkills)
          setSkills(roadmap.items)
        }
      } catch { setError("Your roadmap is unavailable right now.") }
      finally { setLoading(false) }
    }
    load()
  }, [])

  async function toggleItem(item: RoadmapProgressItem) {
    const completed = item.status === "completed"
    const nextStatus = completed ? "not_started" : "completed"
    const nextProgress = completed ? 0 : 100
    setSavingId(item.id)
    try {
      await updateRoadmapItem(item.id, nextStatus, nextProgress)
      setSkills((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, status: nextStatus, progress: nextProgress } : candidate))
    } catch {
      setError("We could not save your progress. Please try again.")
    } finally {
      setSavingId(null)
    }
  }

  const completedCount = skills.filter((item) => item.status === "completed").length
  const progress = skills.length ? Math.round((completedCount / skills.length) * 100) : 0

  return (
    <AppShell title="Learning Roadmap" description="A skill-by-skill path built from your selected career direction." backHref="/career" backLabel="Target Career">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {loading ? <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" />Building your roadmap...</div> : error ? <Card><CardContent className="pt-6 text-sm text-destructive">{error}</CardContent></Card> : !role ? <Card><CardContent className="pt-6"><CardTitle>Choose a target career first</CardTitle><CardDescription className="mt-2">Select a career to generate a learning roadmap.</CardDescription></CardContent></Card> : <div className="flex flex-col gap-8">
          <Card className="border-primary/20 bg-primary/5"><CardHeader><Badge className="w-fit">{role.category}</Badge><CardTitle className="text-2xl">{role.title} roadmap</CardTitle><CardDescription>{role.description} Start with critical foundations, then build the supporting skills employers expect.</CardDescription></CardHeader><CardContent><div className="flex items-center justify-between text-sm"><span className="font-medium">Roadmap progress</span><span className="text-muted-foreground">{completedCount}/{skills.length} completed</span></div><Progress value={progress} className="mt-3" /></CardContent></Card>
          <div className="grid gap-4 md:grid-cols-2">{skills.map((item, index) => <Card key={item.id} className={item.status === "completed" ? "border-primary/30 bg-primary/5" : undefined}><CardHeader><div className="flex items-start gap-4"><div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">{index + 1}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><CardTitle className={item.status === "completed" ? "text-base line-through text-muted-foreground" : "text-base"}>{item.skill?.name ?? "Skill"}</CardTitle><Badge variant={item.priority === "critical" ? "default" : "secondary"}>{formatImportance(item.priority)}</Badge></div><CardDescription className="mt-1">{item.skill?.category ?? "Core competency"}</CardDescription></div><button type="button" onClick={() => toggleItem(item)} disabled={savingId === item.id} aria-label={item.status === "completed" ? `Mark ${item.skill?.name ?? "skill"} incomplete` : `Mark ${item.skill?.name ?? "skill"} complete`} className="text-primary disabled:opacity-50">{item.status === "completed" ? <CheckCircle2 className="size-6" /> : <Circle className="size-6" />}</button></div></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-muted-foreground"><BookOpen className="size-4" />{item.status === "completed" ? "Completed and saved to your roadmap." : "Learn, practice, then mark this skill complete."}</div></CardContent></Card>)}</div>
          {skills.length === 0 && <Card><CardContent className="flex items-center gap-3 pt-6 text-muted-foreground"><CheckCircle2 className="size-5" />No roadmap skills are available yet for this role.</CardContent></Card>}
        </div>}
      </main>
    </AppShell>
  )
}
