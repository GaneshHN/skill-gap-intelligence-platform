import { createClient } from "@/lib/supabase/client"

export type AnalysisHistory = {
  id: string
  readiness_score: number
  matched_count: number
  required_count: number
  created_at: string
  role: { title: string; category: string } | null
}

export async function getAnalysisHistory() {
  const { data, error } = await createClient().from("analyses").select("id, readiness_score, matched_count, required_count, created_at, role:roles(title, category)").order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as AnalysisHistory[]
}

export async function getAnalysisDetail(id: string) {
  const supabase = createClient()
  const [{ data: analysis, error }, { data: skills, error: skillsError }] = await Promise.all([
    supabase.from("analyses").select("id, readiness_score, matched_count, required_count, created_at, role:roles(title, category, description)").eq("id", id).single(),
    supabase.from("analysis_skills").select("status, confidence, evidence, skill:skills(name, category)").eq("analysis_id", id).order("status"),
  ])
  if (error) throw error
  if (skillsError) throw skillsError
  return { analysis: analysis as AnalysisHistory, skills: skills ?? [] }
}

export async function getRoadmapProgress() {
  const { data, error } = await createClient().from("roadmap_items").select("id, status, progress, priority, skill:skills(name, category), analysis:analyses(id, created_at, role:roles(title))").order("created_at", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function saveRoadmapStatus(id: string, status: "not_started" | "in_progress" | "completed") {
  const progress = status === "completed" ? 100 : status === "in_progress" ? 50 : 0
  const { error } = await createClient().from("roadmap_items").update({ status, progress }).eq("id", id)
  if (error) throw error
}

export async function isAdmin() {
  const { data: { user } } = await createClient().auth.getUser()
  return user?.app_metadata?.role === "admin"
}

export async function getAdminCatalog() {
  const supabase = createClient()
  const [profiles, roles, skills, resources] = await Promise.all([
    supabase.from("profiles").select("id, name, email, college, branch, target_career, is_admin").order("name"),
    supabase.from("roles").select("id, key, title, category, description").order("title"),
    supabase.from("skills").select("id, name, category").order("name"),
    supabase.from("resources").select("id, title, url, resource_type, difficulty, skill:skills(name)").order("title"),
  ])
  const failed = [profiles, roles, skills, resources].find((item) => item.error)
  if (failed?.error) throw failed.error
  return { profiles: profiles.data ?? [], roles: roles.data ?? [], skills: skills.data ?? [], resources: resources.data ?? [] }
}

export async function createCatalogSkill(name: string, category: string) {
  const { error } = await createClient().from("skills").insert({ name: name.trim(), category: category.trim() || "general" })
  if (error) throw error
}

export async function createCatalogResource(input: { title: string; url: string; skill_id: string; resource_type: string; difficulty: string }) {
  const { error } = await createClient().from("resources").insert(input)
  if (error) throw error
}

export async function deleteCatalogResource(id: string) {
  const { error } = await createClient().from("resources").delete().eq("id", id)
  if (error) throw error
}
