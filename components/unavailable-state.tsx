import Link from "next/link"
import { ArrowRight, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UnavailableStateProps {
  title: string
  description: string
  primaryHref?: string
  primaryLabel?: string
}

export function UnavailableState({ title, description, primaryHref = "/analyze", primaryLabel = "Use Quick Analysis" }: UnavailableStateProps) {
  return (
    <Card className="border-border/70 bg-card/70">
      <CardHeader>
        <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LockKeyhole className="size-5" aria-hidden="true" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-xl leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={primaryHref}>{primaryLabel}<ArrowRight data-icon="inline-end" /></Link>
        </Button>
      </CardContent>
    </Card>
  )
}
