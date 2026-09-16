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

export function formatImportance(importance: RoleSkill["importance"]) {
  return importance === "nice-to-have" ? "Nice to have" : importance[0].toUpperCase() + importance.slice(1)
}
