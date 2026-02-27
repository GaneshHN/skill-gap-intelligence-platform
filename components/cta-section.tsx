import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 px-8 py-16 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-primary/3 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to close the gap?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-lg text-muted-foreground">
              Stop guessing what to learn. Start your free skill gap analysis
              today and take control of your career growth.
            </p>
            <Button size="lg" className="mt-8 gap-2 px-8 text-base" asChild>
              <Link href="/analyze">
                Start Free Analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
