import { createClient } from "@/lib/supabase/client"

export interface CareerRole {
  id: string
  key: string
  title: string
  category: string
  description: string
}

export interface RoleSkill {
  role_id: string
  skill_id: string
  importance: "critical" | "important" | "nice-to-have"
  skill: { name: string; category: string } | null
}

export async function getCareerRoles() {
  const { data, error } = await createClient()
    .from("roles")
    .select("id, key, title, category, description")
    .order("category")
    .order("title")

  if (error) throw error
  return (data ?? []) as CareerRole[]
}

export async function getRoleSkills(roleId: string) {
  const { data, error } = await createClient()
    .from("role_skills")
    .select("role_id, skill_id, importance, skill:skills(name, category)")
    .eq("role_id", roleId)
    .order("importance")

  if (error) throw error
  return (data ?? []) as RoleSkill[]
}

export async function saveTargetCareer(targetCareer: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("You must be signed in to save a target career.")

  const { error } = await supabase
    .from("profiles")
    .update({ target_career: targetCareer })
    .eq("id", user.id)

  if (error) throw error
}

export interface RoadmapProgressItem {
  id: string
  skill_id: string
  priority: RoleSkill["importance"]
  status: "not_started" | "in_progress" | "completed"
  progress: number
  skill: { name: string; category: string } | null
}

export async function getOrCreateRoadmap(roleId: string, skills: RoleSkill[]) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("You must be signed in to view your roadmap.")

  let { data: analysis, error } = await supabase
    .from("analyses")
    .select("id")
    .eq("user_id", user.id)
    .eq("role_id", roleId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!analysis) {
    const { data: created, error: createError } = await supabase
      .from("analyses")
      .insert({ user_id: user.id, role_id: roleId, required_count: skills.length })
      .select("id")
      .single()
    if (createError) throw createError
    analysis = created
  }

  const { data: existing, error: itemError } = await supabase
    .from("roadmap_items")
    .select("id, skill_id, priority, status, progress, skill:skills(name, category)")
    .eq("analysis_id", analysis.id)

  if (itemError) throw itemError
  if (!existing?.length && skills.length) {
    const { error: seedError } = await supabase.from("roadmap_items").insert(
      skills.map((item) => ({ analysis_id: analysis.id, skill_id: item.skill_id, priority: item.importance }))
    )
    if (seedError) throw seedError
  }

  const { data: items, error: reloadError } = await supabase
    .from("roadmap_items")
    .select("id, skill_id, priority, status, progress, skill:skills(name, category)")
    .eq("analysis_id", analysis.id)
    .order("created_at")

  if (reloadError) throw reloadError
  return { analysisId: analysis.id as string, items: (items ?? []) as RoadmapProgressItem[] }
}

export async function updateRoadmapItem(id: string, status: RoadmapProgressItem["status"], progress: number) {
  const { error } = await createClient().from("roadmap_items").update({ status, progress }).eq("id", id)
  if (error) throw error
}

export function formatImportance(importance: RoleSkill["importance"]) {
  return importance === "nice-to-have" ? "Nice to have" : importance[0].toUpperCase() + importance.slice(1)
}
