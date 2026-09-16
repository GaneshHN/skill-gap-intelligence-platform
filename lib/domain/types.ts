export type CareerDomain =
  | "profile"
  | "resume"
  | "skills"
  | "career"
  | "analysis"
  | "roadmap"
  | "resources"
  | "progress"
  | "history"

export interface StudentProfile {
  id?: string
  fullName?: string
  email?: string
  department?: string
  graduationYear?: number
  targetCareerId?: string
}

export interface ResumeDocument {
  id?: string
  fileName: string
  status: "not_started" | "uploaded" | "extracting" | "ready" | "failed"
  extractedText?: string
  uploadedAt?: string
}

export interface SkillEvidence {
  skillName: string
  source: "profile" | "resume" | "self_reported" | "verified"
  confidence?: number
  evidence?: string
}

export interface CareerAnalysisRequest {
  roleId: string
  selectedSkills: string[]
  skillEvidence?: SkillEvidence[]
}

export interface RoadmapItem {
  skillName: string
  priority: "critical" | "important" | "nice-to-have"
  resourceIds?: string[]
  completed?: boolean
}

export interface LearningResource {
  id?: string
  title: string
  provider: string
  url: string
  type: "video" | "course" | "documentation" | "book" | "practice" | "tutorial"
  updatedAt?: string
}

export interface ProgressRecord {
  roadmapItemId: string
  status: "not_started" | "in_progress" | "completed"
  updatedAt?: string
}

export interface AnalysisHistoryItem {
  id?: string
  roleId: string
  score: number
  createdAt: string
}

export interface PlatformCapabilities {
  authentication: "not_connected"
  persistence: "not_connected"
  resumeExtraction: "not_connected"
  aiSkillExtraction: "not_connected"
  progressTracking: "not_connected"
}

export const platformCapabilities: PlatformCapabilities = {
  authentication: "not_connected",
  persistence: "not_connected",
  resumeExtraction: "not_connected",
  aiSkillExtraction: "not_connected",
  progressTracking: "not_connected",
}

// Integration seams for the future backend. These contracts intentionally contain no fake implementation.
export interface CareerIntelligenceRepository {
  getStudentProfile(): Promise<StudentProfile | null>
  saveStudentProfile(profile: StudentProfile): Promise<StudentProfile>
  uploadResume(file: File): Promise<ResumeDocument>
  extractResumeSkills(resumeId: string): Promise<SkillEvidence[]>
  analyzeCareer(request: CareerAnalysisRequest): Promise<unknown>
  getRoadmap(roleId: string): Promise<RoadmapItem[]>
  getResources(skillName: string): Promise<LearningResource[]>
  getProgress(): Promise<ProgressRecord[]>
  getHistory(): Promise<AnalysisHistoryItem[]>
}

export const careerIntelligenceRepository: CareerIntelligenceRepository | null = null

export function isCapabilityConnected(capability: keyof PlatformCapabilities) {
  return platformCapabilities[capability] !== "not_connected"
}

export function getDomainLabel(domain: CareerDomain) {
  const labels: Record<CareerDomain, string> = {
    profile: "Student Profile",
    resume: "Resume",
    skills: "Skills",
    career: "Target Career",
    analysis: "Skill Gap Analysis",
    roadmap: "Learning Roadmap",
    resources: "Learning Resources",
    progress: "Progress",
    history: "Analysis History",
  }
  return labels[domain]
}
