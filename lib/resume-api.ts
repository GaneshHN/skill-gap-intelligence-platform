export interface ExtractedSkill {
  skillId: string
  skillName: string
  category: string
  confidence: number
  evidence: string
  source: "resume"
}

export interface ResumeUploadResponse {
  resume: { id: string; fileName: string; status: string; fileSize: number }
}

export interface ResumeExtractionResponse {
  resumeId: string
  extractedText: string
  skills: ExtractedSkill[]
}

export function getFlaskApiUrl() {
  return process.env.NEXT_PUBLIC_FLASK_API_URL?.replace(/\/$/, "") ?? ""
}

export function getApiError(value: unknown, fallback: string) {
  if (typeof value === "object" && value && "error" in value && typeof value.error === "string") return value.error
  return fallback
}
