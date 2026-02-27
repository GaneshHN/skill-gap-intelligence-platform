"use client"

import { roles, type Role } from "@/lib/roles-data"
import { cn } from "@/lib/utils"
import { Briefcase, Check } from "lucide-react"

interface RoleSelectorProps {
  selectedRole: string | null
  onSelect: (roleId: string) => void
}

// Group roles by category
const groupedRoles = roles.reduce<Record<string, Role[]>>((acc, role) => {
  if (!acc[role.category]) acc[role.category] = []
  acc[role.category].push(role)
  return acc
}, {})

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Choose your target role</h2>
        <p className="mt-2 text-muted-foreground">
          Select the role you want to work towards. We will compare your skills against its requirements.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedRoles).map(([category, categoryRoles]) => (
          <div key={category}>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {category}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {categoryRoles.map((role) => {
                const isSelected = selectedRole === role.id
                return (
                  <button
                    key={role.id}
                    onClick={() => onSelect(role.id)}
                    className={cn(
                      "group flex items-start gap-4 rounded-xl border p-4 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border/50 bg-card hover:border-primary/30 hover:bg-card/80"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isSelected ? "bg-primary" : "bg-secondary"
                      )}
                    >
                      {isSelected ? (
                        <Check className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Briefcase className={cn("h-5 w-5", "text-muted-foreground")} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "font-semibold transition-colors",
                          isSelected ? "text-primary" : "text-foreground"
                        )}
                      >
                        {role.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {role.description}
                      </p>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {role.requiredSkills.length} skills required
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
