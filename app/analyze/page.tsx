"use client"

import { useState } from "react"
import Link from "next/link"
import { RoleSelector } from "@/components/role-selector"
import { SkillInput } from "@/components/skill-input"
import { ResultsDashboard } from "@/components/results-dashboard"
import { Button } from "@/components/ui/button"
import { analyzeSkillGap, type AnalysisResult } from "@/lib/roles-data"
import { ArrowLeft, ArrowRight, TrendingUp, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = "role" | "skills" | "results"

export default function AnalyzePage() {
  const [step, setStep] = useState<Step>("role")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const steps: { id: Step; label: string }[] = [
    { id: "role", label: "Select Role" },
    { id: "skills", label: "Add Skills" },
    { id: "results", label: "Results" },
  ]

  const currentIndex = steps.findIndex((s) => s.id === step)

  function handleAnalyze() {
    if (!selectedRole) return
    const analysis = analyzeSkillGap(selectedRole, selectedSkills)
    if (analysis) {
      setResult(analysis)
      setStep("results")
    }
  }

  function handleReset() {
    setStep("role")
    setSelectedRole(null)
    setSelectedSkills([])
    setResult(null)
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

          {/* Step indicator */}
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

          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        {step === "role" && (
          <>
            <RoleSelector
              selectedRole={selectedRole}
              onSelect={setSelectedRole}
            />
            <div className="mt-8 flex justify-end">
              <Button
                size="lg"
                disabled={!selectedRole}
                onClick={() => setStep("skills")}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === "skills" && selectedRole && (
          <>
            <SkillInput
              selectedRole={selectedRole}
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
            />
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep("role")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                size="lg"
                disabled={selectedSkills.length === 0}
                onClick={handleAnalyze}
                className="gap-2"
              >
                Analyze Skills
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === "results" && result && (
          <>
            <ResultsDashboard result={result} />
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" size="lg" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                New Analysis
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep("skills")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Edit Skills
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
