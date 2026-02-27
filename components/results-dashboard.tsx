"use client"

import { type AnalysisResult } from "@/lib/roles-data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  FileText,
  GraduationCap,
  Code,
  Play,
} from "lucide-react"

const resourceTypeIcons: Record<string, React.ElementType> = {
  course: GraduationCap,
  documentation: FileText,
  tutorial: Play,
  book: BookOpen,
  practice: Code,
}

function ScoreRing({ percentage }: { percentage: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const color =
    percentage >= 75
      ? "text-chart-1"
      : percentage >= 50
        ? "text-chart-4"
        : "text-chart-5"

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-secondary"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out", color)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn("text-4xl font-bold", color)}>{percentage}%</span>
        <span className="text-sm text-muted-foreground">Match</span>
      </div>
    </div>
  )
}

export function ResultsDashboard({ result }: { result: AnalysisResult }) {
  const { role, matchPercentage, matchedSkills, missingSkills, criticalGaps, recommendations } =
    result

  const readinessLevel =
    matchPercentage >= 85
      ? "Excellent"
      : matchPercentage >= 70
        ? "Good"
        : matchPercentage >= 50
          ? "Moderate"
          : "Needs Work"

  const readinessMessage =
    matchPercentage >= 85
      ? "You are well-prepared for this role. Focus on polishing your weaker areas."
      : matchPercentage >= 70
        ? "Strong foundation. A few more skills and you will be highly competitive."
        : matchPercentage >= 50
          ? "Decent progress. Focus on the critical gaps to strengthen your profile."
          : "Significant gaps remain. Start with the critical skills marked below."

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="rounded-2xl border border-border/50 bg-card p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <ScoreRing percentage={matchPercentage} />
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              {readinessLevel}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground">
              {role.title} Readiness
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {readinessMessage}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-chart-1" />
                <span className="text-sm text-foreground">
                  {matchedSkills.length} matched
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-chart-5" />
                <span className="text-sm text-foreground">
                  {missingSkills.length} missing
                </span>
              </div>
              {criticalGaps.length > 0 && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-chart-4" />
                  <span className="text-sm text-foreground">
                    {criticalGaps.length} critical
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Matched Skills */}
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-chart-1" />
            <h3 className="text-lg font-semibold text-foreground">
              Skills You Have
            </h3>
          </div>
          {matchedSkills.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              None of your listed skills matched this role.
            </p>
          ) : (
            <div className="space-y-3">
              {matchedSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs capitalize",
                      skill.importance === "critical"
                        ? "border-chart-1/30 text-chart-1"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {skill.importance}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-chart-5" />
            <h3 className="text-lg font-semibold text-foreground">
              Skills to Learn
            </h3>
          </div>
          {missingSkills.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have all the required skills for this role.
            </p>
          ) : (
            <div className="space-y-3">
              {missingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-4 py-2.5",
                    skill.importance === "critical"
                      ? "border border-chart-5/20 bg-chart-5/5"
                      : "bg-secondary/50"
                  )}
                >
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs capitalize",
                      skill.importance === "critical"
                        ? "border-chart-5/30 text-chart-5"
                        : skill.importance === "important"
                          ? "border-chart-4/30 text-chart-4"
                          : "border-border text-muted-foreground"
                    )}
                  >
                    {skill.importance}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skill Category Breakdown */}
      <div className="rounded-2xl border border-border/50 bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Category Breakdown
        </h3>
        <div className="space-y-4">
          {["language", "framework", "tool", "concept"].map((cat) => {
            const catSkills = role.requiredSkills.filter((s) => s.category === cat)
            if (catSkills.length === 0) return null
            const catMatched = catSkills.filter((s) =>
              matchedSkills.some((m) => m.name === s.name)
            )
            const pct = Math.round((catMatched.length / catSkills.length) * 100)
            return (
              <div key={cat}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium capitalize text-foreground">
                    {cat === "soft-skill" ? "Soft Skills" : `${cat}s`}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {catMatched.length}/{catSkills.length} ({pct}%)
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Learning Recommendations */}
      {recommendations.length > 0 && (
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Personalized Learning Roadmap
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Resources ordered by priority. Start with high-priority items first.
          </p>
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const priorityColor =
                rec.priority === "high"
                  ? "border-chart-5/20 bg-chart-5/5"
                  : rec.priority === "medium"
                    ? "border-chart-4/20 bg-chart-4/5"
                    : "border-border/50 bg-secondary/30"
              const priorityBadge =
                rec.priority === "high"
                  ? "border-chart-5/30 text-chart-5"
                  : rec.priority === "medium"
                    ? "border-chart-4/30 text-chart-4"
                    : "border-border text-muted-foreground"
              return (
                <div
                  key={rec.skill}
                  className={cn("rounded-xl border p-4", priorityColor)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{rec.skill}</h4>
                    <Badge variant="outline" className={cn("text-xs capitalize", priorityBadge)}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    {rec.resources.map((resource) => {
                      const Icon = resourceTypeIcons[resource.type] || BookOpen
                      return (
                        <a
                          key={resource.title}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-lg bg-background/50 px-3 py-2 text-sm transition-colors hover:bg-background"
                        >
                          <Icon className="h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0 flex-1">
                            <span className="text-foreground">{resource.title}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {resource.provider}
                            </span>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
