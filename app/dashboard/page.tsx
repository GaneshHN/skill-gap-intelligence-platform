import Link from "next/link"
import { ArrowRight, FileText, Gauge, Sparkles } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <AppShell title="Career Intelligence Dashboard" description="A future-ready home for your profile, resume insights, skill gaps, and learning progress.">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader><Badge variant="secondary">Available now</Badge><CardTitle className="mt-3">Quick Skill Analysis</CardTitle><CardDescription>Compare your current skills with a target career.</CardDescription></CardHeader>
            <CardContent><Button asChild><Link href="/analyze">Start analysis<ArrowRight data-icon="inline-end" /></Link></Button></CardContent>
          </Card>
          <Card><CardHeader><div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileText className="size-5" /></div><CardTitle className="mt-3">Resume intelligence</CardTitle><CardDescription>Resume upload, extraction, and skill verification will connect here.</CardDescription></CardHeader></Card>
          <Card><CardHeader><div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Gauge className="size-5" /></div><CardTitle className="mt-3">Readiness score</CardTitle><CardDescription>Placement readiness and progress tracking will use verified data.</CardDescription></CardHeader></Card>
        </section>
        <Card className="border-primary/20 bg-primary/5"><CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><span className="text-sm font-medium">Start with a reliable baseline</span></div><h2 className="mt-2 text-xl font-semibold text-foreground">Run a Quick Skill Analysis before connecting your profile</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Your existing analysis flow remains the working entry point while authentication, resume processing, and persistence are connected.</p></div><Button asChild><Link href="/analyze">Open Quick Analysis<ArrowRight data-icon="inline-end" /></Link></Button></CardContent></Card>
      </main>
    </AppShell>
  )
}
