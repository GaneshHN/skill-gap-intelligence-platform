"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, Loader2, Target } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCareerRoles, saveTargetCareer, type CareerRole } from "@/lib/career-intelligence"

export default function CareerPage() {
  const [roles, setRoles] = useState<CareerRole[]>([])
  const [selected, setSelected] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    getCareerRoles().then(setRoles).catch(() => setError("Career roles are unavailable right now.")).finally(() => setLoading(false))
  }, [])

  const grouped = useMemo(() => roles.reduce<Record<string, CareerRole[]>>((groups, role) => {
    ;(groups[role.category] ??= []).push(role)
    return groups
  }, {}), [roles])

  async function handleSave() {
    if (!selected) return
    setSaving(true); setMessage(""); setError("")
    try { await saveTargetCareer(selected); setMessage("Target career saved to your profile.") }
    catch { setError("We could not save your target career. Please try again.") }
    finally { setSaving(false) }
  }

  return (
    <AppShell title="Target Career" description="Choose a career direction so LevelUp can compare your skills with real industry expectations." backHref="/dashboard" backLabel="Dashboard">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6">
        {loading ? <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" />Loading career roles...</div> : error ? <Card><CardContent className="pt-6 text-sm text-destructive">{error}</CardContent></Card> : (
          <>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Target className="size-5" /></div><div><p className="font-semibold">Your target career powers every recommendation.</p><p className="mt-1 text-sm text-muted-foreground">You can change this anytime as your goals evolve.</p></div></div>
                <Button onClick={handleSave} disabled={!selected || saving}>{saving && <Loader2 className="size-4 animate-spin" />}{saving ? "Saving..." : "Save career"}</Button>
              </CardContent>
            </Card>
            {message && <p className="text-sm text-primary" role="status">{message}</p>}
            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
            <div className="flex flex-col gap-8">{Object.entries(grouped).map(([category, categoryRoles]) => <section key={category} className="flex flex-col gap-4"><div><h2 className="text-xl font-semibold">{category}</h2><p className="text-sm text-muted-foreground">Select the direction that best matches your goals.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{categoryRoles.map((role) => <button key={role.id} type="button" onClick={() => setSelected(role.key)} className="text-left"><Card className={selected === role.key ? "h-full border-primary ring-2 ring-primary/20" : "h-full transition-colors hover:border-primary/50"}><CardHeader><div className="flex items-start justify-between gap-3"><CardTitle className="text-base">{role.title}</CardTitle>{selected === role.key && <Check className="size-5 shrink-0 text-primary" />}</div><Badge variant="secondary" className="w-fit">{category}</Badge></CardHeader><CardContent><CardDescription>{role.description}</CardDescription></CardContent></Card></button>)}</div></section>)}</div>
          </>
        )}
      </main>
    </AppShell>
  )
}
