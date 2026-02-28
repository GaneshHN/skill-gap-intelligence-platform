const steps = [
  {
    number: "01",
    title: "Choose Your Target Role",
    description:
      "Select from 10 industry roles like Frontend Developer, Data Scientist, DevOps Engineer, and more.",
  },
  {
    number: "02",
    title: "Input Your Skills",
    description:
      "Tell us what you already know. Select from our comprehensive skill library or type your own.",
  },
  {
    number: "03",
    title: "Get Your Analysis",
    description:
      "Receive a detailed gap analysis with match percentage, missing skills, and personalized learning recommendations.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Three steps to career clarity
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            No sign-up required. Get your first skill gap analysis in under a minute.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-border md:block" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                  <span className="font-mono text-xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
