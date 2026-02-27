export interface Skill {
  name: string
  category: "language" | "framework" | "tool" | "concept" | "soft-skill"
  importance: "critical" | "important" | "nice-to-have"
}

export interface Role {
  id: string
  title: string
  category: string
  description: string
  requiredSkills: Skill[]
}

export interface AnalysisResult {
  role: Role
  userSkills: string[]
  matchPercentage: number
  matchedSkills: Skill[]
  missingSkills: Skill[]
  criticalGaps: Skill[]
  recommendations: Recommendation[]
}

export interface Recommendation {
  skill: string
  priority: "high" | "medium" | "low"
  resources: Resource[]
}

export interface Resource {
  title: string
  type: "course" | "documentation" | "tutorial" | "book" | "practice"
  url: string
  provider: string
}

export const roles: Role[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Web Development",
    description: "Build user interfaces and interactive web applications",
    requiredSkills: [
      { name: "HTML", category: "language", importance: "critical" },
      { name: "CSS", category: "language", importance: "critical" },
      { name: "JavaScript", category: "language", importance: "critical" },
      { name: "TypeScript", category: "language", importance: "important" },
      { name: "React", category: "framework", importance: "critical" },
      { name: "Next.js", category: "framework", importance: "important" },
      { name: "Tailwind CSS", category: "framework", importance: "important" },
      { name: "Git", category: "tool", importance: "critical" },
      { name: "REST APIs", category: "concept", importance: "important" },
      { name: "Responsive Design", category: "concept", importance: "critical" },
      { name: "Testing", category: "concept", importance: "important" },
      { name: "Performance Optimization", category: "concept", importance: "nice-to-have" },
      { name: "Accessibility", category: "concept", importance: "important" },
      { name: "State Management", category: "concept", importance: "important" },
    ],
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Web Development",
    description: "Design and build server-side logic and APIs",
    requiredSkills: [
      { name: "Python", category: "language", importance: "critical" },
      { name: "JavaScript", category: "language", importance: "important" },
      { name: "TypeScript", category: "language", importance: "important" },
      { name: "SQL", category: "language", importance: "critical" },
      { name: "Node.js", category: "framework", importance: "critical" },
      { name: "Express.js", category: "framework", importance: "important" },
      { name: "REST APIs", category: "concept", importance: "critical" },
      { name: "Git", category: "tool", importance: "critical" },
      { name: "Docker", category: "tool", importance: "important" },
      { name: "PostgreSQL", category: "tool", importance: "important" },
      { name: "Authentication", category: "concept", importance: "critical" },
      { name: "Testing", category: "concept", importance: "important" },
      { name: "System Design", category: "concept", importance: "nice-to-have" },
      { name: "CI/CD", category: "concept", importance: "nice-to-have" },
    ],
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Web Development",
    description: "Build end-to-end web applications from frontend to backend",
    requiredSkills: [
      { name: "HTML", category: "language", importance: "critical" },
      { name: "CSS", category: "language", importance: "critical" },
      { name: "JavaScript", category: "language", importance: "critical" },
      { name: "TypeScript", category: "language", importance: "important" },
      { name: "React", category: "framework", importance: "critical" },
      { name: "Next.js", category: "framework", importance: "important" },
      { name: "Node.js", category: "framework", importance: "critical" },
      { name: "SQL", category: "language", importance: "important" },
      { name: "Git", category: "tool", importance: "critical" },
      { name: "REST APIs", category: "concept", importance: "critical" },
      { name: "Docker", category: "tool", importance: "nice-to-have" },
      { name: "PostgreSQL", category: "tool", importance: "important" },
      { name: "Authentication", category: "concept", importance: "important" },
      { name: "Testing", category: "concept", importance: "important" },
      { name: "Deployment", category: "concept", importance: "important" },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    description: "Extract insights from data using statistics and machine learning",
    requiredSkills: [
      { name: "Python", category: "language", importance: "critical" },
      { name: "SQL", category: "language", importance: "critical" },
      { name: "Statistics", category: "concept", importance: "critical" },
      { name: "Machine Learning", category: "concept", importance: "critical" },
      { name: "Pandas", category: "framework", importance: "critical" },
      { name: "NumPy", category: "framework", importance: "important" },
      { name: "Scikit-learn", category: "framework", importance: "critical" },
      { name: "TensorFlow", category: "framework", importance: "important" },
      { name: "Data Visualization", category: "concept", importance: "important" },
      { name: "Deep Learning", category: "concept", importance: "nice-to-have" },
      { name: "NLP", category: "concept", importance: "nice-to-have" },
      { name: "Git", category: "tool", importance: "important" },
      { name: "Jupyter", category: "tool", importance: "important" },
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Infrastructure",
    description: "Automate and manage infrastructure, deployments, and operations",
    requiredSkills: [
      { name: "Linux", category: "tool", importance: "critical" },
      { name: "Docker", category: "tool", importance: "critical" },
      { name: "Kubernetes", category: "tool", importance: "critical" },
      { name: "AWS", category: "tool", importance: "critical" },
      { name: "CI/CD", category: "concept", importance: "critical" },
      { name: "Terraform", category: "tool", importance: "important" },
      { name: "Python", category: "language", importance: "important" },
      { name: "Bash", category: "language", importance: "critical" },
      { name: "Git", category: "tool", importance: "critical" },
      { name: "Monitoring", category: "concept", importance: "important" },
      { name: "Networking", category: "concept", importance: "important" },
      { name: "Security", category: "concept", importance: "important" },
    ],
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer",
    category: "Mobile",
    description: "Build native and cross-platform mobile applications",
    requiredSkills: [
      { name: "React Native", category: "framework", importance: "critical" },
      { name: "JavaScript", category: "language", importance: "critical" },
      { name: "TypeScript", category: "language", importance: "important" },
      { name: "React", category: "framework", importance: "important" },
      { name: "Git", category: "tool", importance: "critical" },
      { name: "REST APIs", category: "concept", importance: "critical" },
      { name: "iOS Development", category: "concept", importance: "important" },
      { name: "Android Development", category: "concept", importance: "important" },
      { name: "State Management", category: "concept", importance: "important" },
      { name: "Testing", category: "concept", importance: "important" },
      { name: "App Store Deployment", category: "concept", importance: "nice-to-have" },
      { name: "Performance Optimization", category: "concept", importance: "nice-to-have" },
    ],
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    category: "Data & AI",
    description: "Design, build, and deploy machine learning systems at scale",
    requiredSkills: [
      { name: "Python", category: "language", importance: "critical" },
      { name: "Machine Learning", category: "concept", importance: "critical" },
      { name: "Deep Learning", category: "concept", importance: "critical" },
      { name: "TensorFlow", category: "framework", importance: "important" },
      { name: "PyTorch", category: "framework", importance: "critical" },
      { name: "Docker", category: "tool", importance: "important" },
      { name: "MLOps", category: "concept", importance: "important" },
      { name: "AWS", category: "tool", importance: "important" },
      { name: "SQL", category: "language", importance: "important" },
      { name: "Git", category: "tool", importance: "critical" },
      { name: "Data Engineering", category: "concept", importance: "nice-to-have" },
      { name: "NLP", category: "concept", importance: "nice-to-have" },
      { name: "Computer Vision", category: "concept", importance: "nice-to-have" },
    ],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Design",
    description: "Create intuitive and beautiful user interfaces and experiences",
    requiredSkills: [
      { name: "Figma", category: "tool", importance: "critical" },
      { name: "User Research", category: "concept", importance: "critical" },
      { name: "Wireframing", category: "concept", importance: "critical" },
      { name: "Prototyping", category: "concept", importance: "critical" },
      { name: "Design Systems", category: "concept", importance: "important" },
      { name: "Typography", category: "concept", importance: "important" },
      { name: "Color Theory", category: "concept", importance: "important" },
      { name: "Accessibility", category: "concept", importance: "important" },
      { name: "HTML", category: "language", importance: "nice-to-have" },
      { name: "CSS", category: "language", importance: "nice-to-have" },
      { name: "Interaction Design", category: "concept", importance: "important" },
      { name: "Usability Testing", category: "concept", importance: "important" },
    ],
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security",
    description: "Protect organizations from cyber threats and vulnerabilities",
    requiredSkills: [
      { name: "Networking", category: "concept", importance: "critical" },
      { name: "Linux", category: "tool", importance: "critical" },
      { name: "Security", category: "concept", importance: "critical" },
      { name: "Python", category: "language", importance: "important" },
      { name: "Penetration Testing", category: "concept", importance: "important" },
      { name: "Incident Response", category: "concept", importance: "critical" },
      { name: "SIEM Tools", category: "tool", importance: "important" },
      { name: "Vulnerability Assessment", category: "concept", importance: "critical" },
      { name: "Cryptography", category: "concept", importance: "important" },
      { name: "Cloud Security", category: "concept", importance: "nice-to-have" },
      { name: "Compliance", category: "concept", importance: "nice-to-have" },
    ],
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    category: "Infrastructure",
    description: "Design and manage scalable cloud infrastructure solutions",
    requiredSkills: [
      { name: "AWS", category: "tool", importance: "critical" },
      { name: "Azure", category: "tool", importance: "important" },
      { name: "Docker", category: "tool", importance: "critical" },
      { name: "Kubernetes", category: "tool", importance: "critical" },
      { name: "Terraform", category: "tool", importance: "critical" },
      { name: "Networking", category: "concept", importance: "critical" },
      { name: "Security", category: "concept", importance: "important" },
      { name: "System Design", category: "concept", importance: "critical" },
      { name: "CI/CD", category: "concept", importance: "important" },
      { name: "Python", category: "language", importance: "nice-to-have" },
      { name: "Monitoring", category: "concept", importance: "important" },
      { name: "Cost Optimization", category: "concept", importance: "nice-to-have" },
    ],
  },
]

// Comprehensive list of all skills across all roles
export const allSkills: string[] = Array.from(
  new Set(roles.flatMap((role) => role.requiredSkills.map((s) => s.name)))
).sort()

// Resource database
const resourceMap: Record<string, Resource[]> = {
  "HTML": [
    { title: "MDN HTML Guide", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", provider: "MDN" },
    { title: "HTML & CSS Full Course", type: "course", url: "https://www.freecodecamp.org/learn", provider: "freeCodeCamp" },
  ],
  "CSS": [
    { title: "MDN CSS Reference", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", provider: "MDN" },
    { title: "CSS for JavaScript Developers", type: "course", url: "https://css-for-js.dev", provider: "Josh Comeau" },
  ],
  "JavaScript": [
    { title: "JavaScript.info", type: "tutorial", url: "https://javascript.info", provider: "javascript.info" },
    { title: "Eloquent JavaScript", type: "book", url: "https://eloquentjavascript.net", provider: "Marijn Haverbeke" },
  ],
  "TypeScript": [
    { title: "TypeScript Handbook", type: "documentation", url: "https://www.typescriptlang.org/docs/", provider: "Microsoft" },
    { title: "Total TypeScript", type: "course", url: "https://www.totaltypescript.com", provider: "Matt Pocock" },
  ],
  "React": [
    { title: "React Documentation", type: "documentation", url: "https://react.dev", provider: "Meta" },
    { title: "React - The Complete Guide", type: "course", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", provider: "Udemy" },
  ],
  "Next.js": [
    { title: "Next.js Documentation", type: "documentation", url: "https://nextjs.org/docs", provider: "Vercel" },
    { title: "Next.js App Router Course", type: "course", url: "https://nextjs.org/learn", provider: "Vercel" },
  ],
  "Python": [
    { title: "Python Official Tutorial", type: "documentation", url: "https://docs.python.org/3/tutorial/", provider: "Python.org" },
    { title: "Automate the Boring Stuff", type: "book", url: "https://automatetheboringstuff.com", provider: "Al Sweigart" },
  ],
  "SQL": [
    { title: "SQLBolt Interactive Tutorial", type: "tutorial", url: "https://sqlbolt.com", provider: "SQLBolt" },
    { title: "SQL Practice", type: "practice", url: "https://www.hackerrank.com/domains/sql", provider: "HackerRank" },
  ],
  "Git": [
    { title: "Pro Git Book", type: "book", url: "https://git-scm.com/book/en/v2", provider: "Git" },
    { title: "Learn Git Branching", type: "practice", url: "https://learngitbranching.js.org", provider: "Learn Git Branching" },
  ],
  "Docker": [
    { title: "Docker Getting Started", type: "documentation", url: "https://docs.docker.com/get-started/", provider: "Docker" },
    { title: "Docker Mastery Course", type: "course", url: "https://www.udemy.com/course/docker-mastery/", provider: "Udemy" },
  ],
  "Machine Learning": [
    { title: "Andrew Ng's ML Course", type: "course", url: "https://www.coursera.org/learn/machine-learning", provider: "Coursera" },
    { title: "Hands-On ML with Scikit-Learn", type: "book", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125974/", provider: "O'Reilly" },
  ],
  "AWS": [
    { title: "AWS Cloud Practitioner Essentials", type: "course", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", provider: "AWS" },
    { title: "AWS Documentation", type: "documentation", url: "https://docs.aws.amazon.com", provider: "Amazon" },
  ],
  "Kubernetes": [
    { title: "Kubernetes Basics", type: "tutorial", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", provider: "Kubernetes" },
    { title: "Learn Kubernetes", type: "practice", url: "https://www.katacoda.com/courses/kubernetes", provider: "Katacoda" },
  ],
}

function getDefaultResources(skillName: string): Resource[] {
  return [
    { title: `Learn ${skillName} - Official Docs`, type: "documentation", url: `https://www.google.com/search?q=${encodeURIComponent(skillName)}+documentation`, provider: "Web" },
    { title: `${skillName} Tutorial`, type: "tutorial", url: `https://www.google.com/search?q=${encodeURIComponent(skillName)}+tutorial+beginner`, provider: "Web" },
  ]
}

export function analyzeSkillGap(roleId: string, userSkills: string[]): AnalysisResult | null {
  const role = roles.find((r) => r.id === roleId)
  if (!role) return null

  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase().trim())

  const matchedSkills: Skill[] = []
  const missingSkills: Skill[] = []

  for (const skill of role.requiredSkills) {
    if (normalizedUserSkills.includes(skill.name.toLowerCase())) {
      matchedSkills.push(skill)
    } else {
      missingSkills.push(skill)
    }
  }

  const criticalGaps = missingSkills.filter((s) => s.importance === "critical")

  // Weighted scoring: critical=3, important=2, nice-to-have=1
  const weights = { critical: 3, important: 2, "nice-to-have": 1 }
  const totalWeight = role.requiredSkills.reduce((sum, s) => sum + weights[s.importance], 0)
  const matchedWeight = matchedSkills.reduce((sum, s) => sum + weights[s.importance], 0)
  const matchPercentage = Math.round((matchedWeight / totalWeight) * 100)

  // Sort missing by importance
  const priorityOrder = { critical: 0, important: 1, "nice-to-have": 2 }
  missingSkills.sort((a, b) => priorityOrder[a.importance] - priorityOrder[b.importance])

  const recommendations: Recommendation[] = missingSkills.map((skill) => ({
    skill: skill.name,
    priority: skill.importance === "critical" ? "high" : skill.importance === "important" ? "medium" : "low",
    resources: resourceMap[skill.name] || getDefaultResources(skill.name),
  }))

  return {
    role,
    userSkills,
    matchPercentage,
    matchedSkills,
    missingSkills,
    criticalGaps,
    recommendations,
  }
}
