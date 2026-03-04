"use client"

import { useState } from "react"
import Link from "next/link"
import { DepartmentSelector } from "@/components/department-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, TrendingUp, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = "department" | "review"

export default function StudentFormPage() {
  const [step, setStep] = useState<Step>("department")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [otherDepartment, setOtherDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const steps: { id: Step; label: string }[] = [
    { id: "department", label: "Select Department" },
    { id: "review", label: "Review & Submit" },
  ]

  const currentIndex = steps.findIndex((s) => s.id === step)
  const departmentName =
    selectedDepartment === "other"
      ? otherDepartment
      : selectedDepartment
        ? getDepartmentLabel(selectedDepartment)
        : null

  function getDepartmentLabel(id: string): string {
    const depts: Record<string, string> = {
      cs: "Computer Science & Engineering",
      it: "Information Technology",
      ai: "Artificial Intelligence & Data Science",
      mechanical: "Mechanical Engineering",
      civil: "Civil Engineering",
      electrical: "Electrical Engineering",
      electronics: "Electronics & Communication Engineering",
      aerospace: "Aerospace Engineering",
      biotechnology: "Biotechnology Engineering",
      chemical: "Chemical Engineering",
      automobile: "Automobile Engineering",
      mechatronics: "Mechatronics Engineering",
      industrial: "Industrial & Production Engineering",
      robotics: "Robotics Engineering",
      environmental: "Environmental Engineering",
      materials: "Materials Science Engineering",
      biomedical: "Biomedical Engineering",
      agricultural: "Agricultural Engineering",
      petroleum: "Petroleum Engineering",
      mining: "Mining Engineering",
      marine: "Marine Engineering",
    }
    return depts[id] || ""
  }

  function handleSubmit() {
    // Store form data (can be extended to send to backend)
    const formData = {
      department: selectedDepartment === "other" ? otherDepartment : departmentName,
      email: email,
      timestamp: new Date().toISOString(),
    }
    console.log("[v0] Form submitted:", formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">LevelUp</span>
            </Link>
          </div>
        </header>

        {/* Success message */}
        <main className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Registration Submitted!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for registering, {email}. We will be in touch soon.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild>
                <Link href="/analyze">Analyze Your Skills</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">LevelUp</span>
          </Link>

          {/* Step indicator - mobile */}
          <div className="flex items-center gap-1.5 sm:hidden">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  i <= currentIndex ? "w-6 bg-primary" : "w-3 bg-secondary"
                )}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">
              {currentIndex + 1}/{steps.length}
            </span>
          </div>

          {/* Step indicator - desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    i <= currentIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    i <= currentIndex ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-px w-8 transition-colors",
                      i < currentIndex ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Exit</Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        {step === "department" && (
          <>
            <DepartmentSelector
              selectedDepartment={selectedDepartment}
              otherDepartment={otherDepartment}
              onSelect={setSelectedDepartment}
              onOtherChange={setOtherDepartment}
            />
            <div className="mt-10 flex justify-end">
              <Button
                size="lg"
                disabled={!selectedDepartment || (selectedDepartment === "other" && !otherDepartment.trim())}
                onClick={() => setStep("review")}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === "review" && (
          <>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Review Your Information</h2>
                <p className="mt-2 text-muted-foreground">
                  Please confirm the details below before submitting.
                </p>
              </div>

              {/* Department card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p className="mt-2 text-xl font-semibold text-foreground">{departmentName}</p>
              </div>

              {/* Email input */}
              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address (Optional)
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-border/50 bg-card"
                />
                <p className="text-xs text-muted-foreground">
                  We will send you personalized recommendations and updates.
                </p>
              </div>

              {/* Form actions */}
              <div className="flex justify-between gap-4 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep("department")}
                >
                  Back
                </Button>
                <Button size="lg" onClick={handleSubmit} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Submit Registration
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
