"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"

export const departments = [
  { id: "cs", label: "Computer Science & Engineering", icon: "💻" },
  { id: "it", label: "Information Technology", icon: "🖥️" },
  { id: "ai", label: "Artificial Intelligence & Data Science", icon: "🤖" },
  { id: "mechanical", label: "Mechanical Engineering", icon: "⚙️" },
  { id: "civil", label: "Civil Engineering", icon: "🏗️" },
  { id: "electrical", label: "Electrical Engineering", icon: "⚡" },
  { id: "electronics", label: "Electronics & Communication Engineering", icon: "📡" },
  { id: "aerospace", label: "Aerospace Engineering", icon: "✈️" },
  { id: "biotechnology", label: "Biotechnology Engineering", icon: "🧬" },
  { id: "chemical", label: "Chemical Engineering", icon: "⚗️" },
  { id: "automobile", label: "Automobile Engineering", icon: "🚗" },
  { id: "mechatronics", label: "Mechatronics Engineering", icon: "🤝" },
  { id: "industrial", label: "Industrial & Production Engineering", icon: "🏭" },
  { id: "robotics", label: "Robotics Engineering", icon: "🦾" },
  { id: "environmental", label: "Environmental Engineering", icon: "🌍" },
  { id: "materials", label: "Materials Science Engineering", icon: "🔬" },
  { id: "biomedical", label: "Biomedical Engineering", icon: "🏥" },
  { id: "agricultural", label: "Agricultural Engineering", icon: "🌾" },
  { id: "petroleum", label: "Petroleum Engineering", icon: "🛢️" },
  { id: "mining", label: "Mining Engineering", icon: "⛏️" },
  { id: "marine", label: "Marine Engineering", icon: "⚓" },
  { id: "other", label: "Other (Please Specify)", icon: "📝" },
]

interface DepartmentSelectorProps {
  selectedDepartment: string | null
  otherDepartment: string
  onSelect: (departmentId: string) => void
  onOtherChange: (value: string) => void
}

export function DepartmentSelector({
  selectedDepartment,
  otherDepartment,
  onSelect,
  onOtherChange,
}: DepartmentSelectorProps) {
  const [gridView, setGridView] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Select your department</h2>
        <p className="mt-2 text-muted-foreground">
          Choose your primary engineering or technical discipline. We will tailor skill recommendations to your field.
        </p>
      </div>

      {/* Grid view */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept.id
          return (
            <div key={dept.id}>
              <button
                onClick={() => onSelect(dept.id)}
                className={cn(
                  "group relative w-full rounded-xl border p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border/50 bg-card hover:border-primary/30 hover:bg-card/80"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{departments.find(d => d.id === dept.id)?.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        isSelected ? "text-primary" : "text-foreground"
                      )}
                    >
                      {dept.label}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </button>

              {/* Conditional input for "Other" department */}
              {dept.id === "other" && isSelected && (
                <div className="mt-3 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Please specify your department
                  </label>
                  <Input
                    placeholder="e.g., Quantum Engineering, Bioinformatics"
                    value={otherDepartment}
                    onChange={(e) => onOtherChange(e.target.value)}
                    className="rounded-lg border-border/50 bg-card text-sm"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedDepartment && selectedDepartment !== "other" && (
        <div className="rounded-lg border border-border/50 bg-card/50 p-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Selected:</span>{" "}
            <span className="text-primary">
              {departments.find((d) => d.id === selectedDepartment)?.label}
            </span>
          </p>
        </div>
      )}

      {selectedDepartment === "other" && otherDepartment && (
        <div className="rounded-lg border border-border/50 bg-card/50 p-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Selected:</span>{" "}
            <span className="text-primary">{otherDepartment}</span>
          </p>
        </div>
      )}
    </div>
  )
}
