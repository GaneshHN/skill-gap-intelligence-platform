import { AppShell } from "@/components/app-shell"
import { UnavailableState } from "@/components/unavailable-state"

interface WorkspacePlaceholderProps {
  title: string
  description: string
  capability: string
}

export function WorkspacePlaceholder({ title, description, capability }: WorkspacePlaceholderProps) {
  return (
    <AppShell title={title} description={description} backHref="/" backLabel="Back to home">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <UnavailableState
            title={`${capability} is not connected yet`}
            description="This workspace is intentionally ready for a real backend integration. LevelUp will not show placeholder student data or claim that this capability is active before the required service is connected."
          />
          <aside className="rounded-xl border border-border/70 bg-card/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Architecture ready</p>
            <h2 className="mt-3 text-lg font-semibold text-foreground">What comes next</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
              <li>Connect authentication and student identity.</li>
              <li>Attach persistence for this domain.</li>
              <li>Replace the repository seam with a live service.</li>
            </ul>
          </aside>
        </div>
      </main>
    </AppShell>
  )
}
