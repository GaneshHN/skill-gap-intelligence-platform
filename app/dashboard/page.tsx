"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Gauge,
  History,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  XCircle,
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-provider"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

type DashboardData = {
  profile: { name: string; target_career: string | null } | null
  role: { title: string; category: string } | null
  resume: { file_name: string; status: string } | null
  analysis: { id: string; readiness_score: number; matched_count: number; required_count: number; created_at: string } | null
  roadmap: { id: string; skill_id: string; status: string; progress: number; priority: string; skill: { name: string } | null }[]
  resources: { id: string; title: string; url: string; resource_type: string; difficulty: string; skill: { name: string } | null }[]
  history: { id: string; readiness_score: number; created_at: string }[]
}

const emptyData: DashboardData = { profile: null, role: null, resume: null, analysis: null, roadmap: [], resources: [], history: [] }

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value))
}

function DashboardSkeleton() {
  return <div className="flex flex-col gap-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Card key={index}><CardHeader><Skeleton className="h-4 w-24" /><Skeleton className="mt-3 h-9 w-20" /></CardHeader></Card>)}</div><div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]"><Card><CardHeader><Skeleton className="h-6 w-40" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card><Card><CardHeader><Skeleton className="h-6 w-40" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card></div></div>
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState<DashboardData>(emptyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userId = user?.id
    if (!userId) return
    let active = true
    async function loadDashboard() {
      setLoading(true)
      setError(null)
      const supabase = createClient()
      try {
        const [profileResult, resumeResult, analysisResult] = await Promise.all([
          supabase.from("profiles").select("name, target_career").eq("id", userId).maybeSingle(),
          supabase.from("resumes").select("file_name, status").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("analyses").select("id, role_id, readiness_score, matched_count, required_count, created_at, roles(title, category)").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        ])
        if (profileResult.error || resumeResult.error || analysisResult.error) throw profileResult.error ?? resumeResult.error ?? analysisResult.error
        const analysis = analysisResult.data as (DashboardData["analysis"] & { role_id: string; roles: { title: string; category: string } | null }) | null
        const [roadmapResult, historyResult] = await Promise.all([
          analysis ? supabase.from("roadmap_items").select("id, status, progress, priority, skill:skills(name)").eq("analysis_id", analysis.id).order("created_at") : Promise.resolve({ data: [], error: null }),
          supabase.from("analyses").select("id, readiness_score, created_at").eq("user_id", userId).order("created_at", { ascending: true }).limit(8),
        ])
        if (roadmapResult.error || historyResult.error) throw roadmapResult.error ?? historyResult.error
        const roadmapRows = (roadmapResult.data ?? []) as DashboardData["roadmap"]
        const skillIds = roadmapRows.map((item) => item.skill_id).filter(Boolean) as string[]
        const resourcesResult = skillIds.length ? await supabase.from("resources").select("id, title, url, resource_type, difficulty, skill:skills(name)").in("skill_id", skillIds).limit(6) : { data: [], error: null }
        if (resourcesResult.error) throw resourcesResult.error
        if (!active) return
        setData({ profile: profileResult.data, resume: resumeResult.data, analysis: analysis ? { id: analysis.id, readiness_score: analysis.readiness_score, matched_count: analysis.matched_count, required_count: analysis.required_count, created_at: analysis.created_at } : null, role: analysis?.roles ?? null, roadmap: (roadmapResult.data ?? []) as DashboardData["roadmap"], resources: (resourcesResult.data ?? []) as DashboardData["resources"], history: historyResult.data ?? [] })
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load your dashboard.")
      } finally {
        if (active) setLoading(false)
      }
    }
    loadDashboard()
    return () => { active = false }
  }, [user])

  const completedRoadmap = data.roadmap.filter((item) => item.status === "completed").length
  const roadmapProgress = data.roadmap.length ? Math.round(data.roadmap.reduce((total, item) => total + item.progress, 0) / data.roadmap.length) : 0
  const missingSkills = data.analysis ? Math.max(data.analysis.required_count - data.analysis.matched_count, 0) : 0
  const chartData = data.history.map((item) => ({ date: formatDate(item.created_at), readiness: item.readiness_score }))

  return <ProtectedRoute><AppShell title="Student dashboard" description="Your live career intelligence workspace, powered by your profile, resume, and saved analyses."><main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6">
    {loading ? <DashboardSkeleton /> : error ? <Alert variant="destructive"><XCircle className="size-4" /><AlertTitle>Dashboard unavailable</AlertTitle><AlertDescription>{error}</AlertDescription></Alert> : <>
      <section className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-sm text-muted-foreground"><UserRound className="size-4" /> Welcome back{data.profile?.name ? `, ${data.profile.name}` : ""}</div><h2 className="mt-2 text-xl font-semibold">{data.role ? data.role.title : "Build your career baseline"}</h2><p className="mt-1 text-sm text-muted-foreground">{data.role ? data.role.category : "Upload a resume or run a skill analysis to unlock your dashboard."}</p></div><Button asChild><Link href={data.role ? "/roadmap" : "/analyze"}>{data.role ? "Open roadmap" : "Start analysis"}<ArrowRight data-icon="inline-end" /></Link></Button></section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Placement readiness" value={data.analysis ? `${data.analysis.readiness_score}%` : "—"} icon={Gauge} detail={data.analysis ? "From your latest analysis" : "Run an analysis to calculate"} />
        <MetricCard label="Matched skills" value={data.analysis ? String(data.analysis.matched_count) : "—"} icon={CheckCircle2} detail={data.analysis ? `Of ${data.analysis.required_count} required skills` : "No analysis yet"} />
        <MetricCard label="Missing skills" value={data.analysis ? String(missingSkills) : "—"} icon={Target} detail={data.analysis ? "Prioritized in your roadmap" : "No analysis yet"} />
        <MetricCard label="Roadmap progress" value={data.roadmap.length ? `${roadmapProgress}%` : "—"} icon={TrendingUp} detail={data.roadmap.length ? `${completedRoadmap} of ${data.roadmap.length} completed` : "Create a roadmap from analysis"} />
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Card><CardHeader><CardTitle>Skill gap overview</CardTitle><CardDescription>Latest saved analysis compared with your target career.</CardDescription></CardHeader><CardContent>{data.analysis ? <div className="flex flex-col gap-6"><div className="flex items-end justify-between"><div><p className="text-5xl font-bold tracking-tight">{data.analysis.readiness_score}%</p><p className="mt-1 text-sm text-muted-foreground">Placement readiness</p></div><Badge variant="secondary">{data.analysis.matched_count} matched</Badge></div><Progress value={data.analysis.readiness_score} aria-label={`Placement readiness ${data.analysis.readiness_score}%`} /><div className="grid grid-cols-2 gap-4"><div className="rounded-xl border border-border/60 p-4"><p className="text-2xl font-semibold">{data.analysis.matched_count}</p><p className="text-sm text-muted-foreground">Matched skills</p></div><div className="rounded-xl border border-border/60 p-4"><p className="text-2xl font-semibold">{missingSkills}</p><p className="text-sm text-muted-foreground">Missing skills</p></div></div></div> : <EmptyState title="No analysis yet" description="Run Quick Skill Analysis to see your real skill gap and readiness score." href="/analyze" action="Run analysis" />}</CardContent></Card>
        <Card><CardHeader><CardTitle>Resume status</CardTitle><CardDescription>Resume intelligence starts with an uploaded document.</CardDescription></CardHeader><CardContent>{data.resume ? <div className="flex items-center gap-4 rounded-xl border border-border/60 p-4"><FileText className="size-8 text-primary" /><div className="min-w-0 flex-1"><p className="truncate font-medium">{data.resume.file_name}</p><p className="text-sm capitalize text-muted-foreground">{data.resume.status}</p></div><Badge variant={data.resume.status === "ready" ? "default" : "secondary"}>{data.resume.status}</Badge></div> : <EmptyState title="No resume uploaded yet" description="Upload your resume to extract skills and improve your career analysis." href="/resume" action="Upload resume" />}</CardContent></Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Card><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle>Personalized roadmap</CardTitle><CardDescription>Progress across skills from your latest analysis.</CardDescription></div><Button variant="ghost" size="sm" asChild><Link href="/roadmap">View all<ArrowRight data-icon="inline-end" /></Link></Button></div></CardHeader><CardContent>{data.roadmap.length ? <div className="flex flex-col gap-4">{data.roadmap.slice(0, 5).map((item) => <div key={item.id} className="flex flex-col gap-2"><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><span className={`size-2 rounded-full ${item.status === "completed" ? "bg-primary" : "bg-muted-foreground/40"}`} /><span className="truncate text-sm font-medium">{item.skill?.name ?? "Skill"}</span></div><span className="text-xs text-muted-foreground">{item.progress}%</span></div><Progress value={item.progress} aria-label={`${item.skill?.name ?? "Skill"} progress ${item.progress}%`} /></div>)}</div> : <EmptyState title="No roadmap yet" description="Run an analysis with a target career to generate a personalized roadmap." href="/analyze" action="Create roadmap" />}</CardContent></Card>
        <Card><CardHeader><CardTitle>Recommended resources</CardTitle><CardDescription>Learning links connected to roadmap skills.</CardDescription></CardHeader><CardContent>{data.resources.length ? <div className="flex flex-col gap-3">{data.resources.slice(0, 4).map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:bg-secondary"><BookOpen className="size-4 shrink-0 text-primary" /><span className="min-w-0 flex-1 truncate text-sm font-medium">{resource.title}</span><ArrowRight className="size-4 shrink-0 text-muted-foreground" /></a>)}</div> : <EmptyState title="No resources yet" description="Resources will appear after your roadmap is created." href="/roadmap" action="View roadmap" />}</CardContent></Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Card><CardHeader><CardTitle>Readiness trend</CardTitle><CardDescription>Saved analyses over time. No fabricated values are shown.</CardDescription></CardHeader><CardContent>{chartData.length > 1 ? <ChartContainer config={{ readiness: { label: "Readiness", color: "hsl(var(--primary))" } }} className="h-64 w-full"><AreaChart accessibilityLayer data={chartData} margin={{ left: 4, right: 12, top: 12 }}><CartesianGrid vertical={false} /><XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} /><ChartTooltip content={<ChartTooltipContent />} /><Area dataKey="readiness" type="monotone" fill="var(--color-readiness)" fillOpacity={0.18} stroke="var(--color-readiness)" strokeWidth={2} /></AreaChart></ChartContainer> : <EmptyState title="Not enough history" description="Complete another analysis to see your readiness trend." href="/analyze" action="Run analysis" />}</CardContent></Card>
        <Card><CardHeader><CardTitle>Recent analysis</CardTitle><CardDescription>Your latest saved career assessments.</CardDescription></CardHeader><CardContent>{data.history.length ? <div className="flex flex-col gap-3">{data.history.slice(-4).reverse().map((item) => <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3"><History className="size-4 text-primary" /><div className="flex-1"><p className="text-sm font-medium">Career analysis</p><p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p></div><Badge variant="secondary">{item.readiness_score}%</Badge></div>)}</div> : <EmptyState title="No analysis history" description="Your completed analyses will be listed here." href="/analyze" action="Start analysis" />}</CardContent></Card>
      </section>
    </>}
  </main></AppShell></ProtectedRoute>
}

function MetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Gauge }) {
  return <Card><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardDescription>{label}</CardDescription><CardTitle className="mt-2 text-3xl">{value}</CardTitle></div><div className="rounded-lg bg-primary/10 p-2 text-primary"><Icon className="size-5" /></div></CardHeader><CardContent><p className="text-xs text-muted-foreground">{detail}</p></CardContent></Card>
}

function EmptyState({ title, description, href, action }: { title: string; description: string; href: string; action: string }) {
  return <Empty className="min-h-48 border-0 p-4"><EmptyHeader><EmptyMedia variant="icon"><Upload /></EmptyMedia><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{description}</EmptyDescription></EmptyHeader><Button asChild size="sm"><Link href={href}>{action}<ArrowRight data-icon="inline-end" /></Link></Button></Empty>
}
