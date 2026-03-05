"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { allSkills, roles } from "@/lib/roles-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Search, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillInputProps {
  selectedRole: string
  selectedSkills: string[]
  onSkillsChange: (skills: string[]) => void
}

export function SkillInput({ selectedRole, selectedSkills, onSkillsChange }: SkillInputProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const role = roles.find((r) => r.id === selectedRole)
  const roleSkillNames = role?.requiredSkills.map((s) => s.name) ?? []

  // Prioritize skills for the selected role, then show all
  const filteredSkills = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim()
    const pool = allSkills.filter(
      (s) => !selectedSkills.includes(s) && (lowerQuery === "" || s.toLowerCase().includes(lowerQuery))
    )
    // Sort: role-relevant first
    return pool.sort((a, b) => {
      const aRelevant = roleSkillNames.includes(a) ? 0 : 1
      const bRelevant = roleSkillNames.includes(b) ? 0 : 1
      return aRelevant - bRelevant || a.localeCompare(b)
    })
  }, [query, selectedSkills, roleSkillNames])

  const addSkill = (skill: string) => {
    onSkillsChange([...selectedSkills, skill])
    setQuery("")
    inputRef.current?.focus()
  }

  const removeSkill = (skill: string) => {
    onSkillsChange(selectedSkills.filter((s) => s !== skill))
  }

  const addCustomSkill = () => {
    const trimmed = query.trim()
    if (trimmed && !selectedSkills.includes(trimmed)) {
      onSkillsChange([...selectedSkills, trimmed])
      setQuery("")
    }
  }

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Quick-add buttons for role-relevant skills
  const quickAddSkills = roleSkillNames.filter((s) => !selectedSkills.includes(s))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Input your skills</h2>
        <p className="mt-2 text-muted-foreground">
          Tell us what you already know. Search from our library or type your own skills.
        </p>
      </div>

      {/* Search input */}
      <div ref={containerRef} className="relative">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                if (filteredSkills.length > 0 && query.trim()) {
                  const exactMatch = filteredSkills.find(
                    (s) => s.toLowerCase() === query.toLowerCase().trim()
                  )
                  if (exactMatch) {
                    addSkill(exactMatch)
                  } else {
                    addCustomSkill()
                  }
                } else if (query.trim()) {
                  addCustomSkill()
                }
              }
            }}
            placeholder="Search skills (e.g., React, Python, Docker...)"
            className="w-full rounded-xl border border-border/50 bg-card py-3 pr-4 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && (query.trim() || filteredSkills.length > 0) && (
          <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-border bg-card p-2 shadow-lg">
            {filteredSkills.slice(0, 12).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary",
                  roleSkillNames.includes(skill) && "font-medium"
                )}
              >
                <span className="text-foreground">{skill}</span>
                <div className="flex items-center gap-2">
                  {roleSkillNames.includes(skill) && (
                    <span className="text-xs text-primary">Relevant</span>
                  )}
                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </button>
            ))}
            {query.trim() && !allSkills.some((s) => s.toLowerCase() === query.toLowerCase().trim()) && (
              <button
                onClick={addCustomSkill}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-secondary"
              >
                <Plus className="h-3.5 w-3.5" />
                {'Add "'}{query.trim()}{'" as custom skill'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Selected skills */}
      {selectedSkills.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Your skills ({selectedSkills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1.5 py-1 pl-3 pr-2 text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="rounded-full p-0.5 transition-colors hover:bg-muted-foreground/20"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSkillsChange([])}
              className="text-xs text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}

      {/* Quick-add for role-relevant skills */}
      {quickAddSkills.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Quick add relevant skills
          </p>
          <div className="flex flex-wrap gap-2">
            {quickAddSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-border/50 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
              >
                <Plus className="h-3 w-3" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show selected skills in a more prominent way */}
      {selectedSkills.length > 0 && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
            Selected Skills ({selectedSkills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-foreground"
              >
                <Check className="h-4 w-4 text-primary" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
