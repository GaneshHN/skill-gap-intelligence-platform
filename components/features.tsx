import { Target, BarChart3, BookOpen, Map, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Skill Gap Detection",
    description:
      "Compare your current skills against role requirements and instantly see what is missing from your toolkit.",
  },
  {
    icon: BarChart3,
    title: "Match Scoring",
    description:
      "Get a clear percentage readiness score that shows exactly how close you are to your target role.",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Receive curated, personalized resource recommendations to efficiently close your skill gaps.",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description:
      "Visualize your learning journey with a structured roadmap from where you are to where you want to be.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "No lengthy assessments. Input your skills and target role to get actionable insights in seconds.",
  },
  {
    icon: Shield,
    title: "Industry Benchmarks",
    description:
      "Powered by real industry data to ensure your skill assessment reflects actual market demands.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything you need for career clarity
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Not another course platform. A career intelligence engine that tells
            you exactly what to learn and why.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
