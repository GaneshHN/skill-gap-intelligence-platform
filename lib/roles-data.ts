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
  {
    id: "it-support-admin",
    title: "IT Support & Systems Admin",
    category: "Infrastructure",
    description: "Manage IT infrastructure, user support, and system administration",
    requiredSkills: [
      { name: "Windows Server", category: "tool", importance: "critical" },
      { name: "Linux", category: "tool", importance: "critical" },
      { name: "Networking", category: "concept", importance: "critical" },
      { name: "Active Directory", category: "tool", importance: "critical" },
      { name: "Cloud Services", category: "tool", importance: "important" },
      { name: "Azure", category: "tool", importance: "important" },
      { name: "AWS", category: "tool", importance: "important" },
      { name: "Cybersecurity", category: "concept", importance: "important" },
      { name: "Backup & Recovery", category: "concept", importance: "critical" },
      { name: "System Monitoring", category: "concept", importance: "important" },
      { name: "Help Desk Support", category: "soft-skill", importance: "critical" },
      { name: "Technical Communication", category: "soft-skill", importance: "important" },
      { name: "Troubleshooting", category: "soft-skill", importance: "critical" },
    ],
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Mechanical Engineering",
    description: "Design and optimize mechanical systems and components",
    requiredSkills: [
      { name: "CAD Design", category: "tool", importance: "critical" },
      { name: "SOLIDWORKS", category: "tool", importance: "critical" },
      { name: "AutoCAD", category: "tool", importance: "important" },
      { name: "Thermodynamics", category: "concept", importance: "critical" },
      { name: "Mechanics", category: "concept", importance: "critical" },
      { name: "Fluid Dynamics", category: "concept", importance: "important" },
      { name: "Material Science", category: "concept", importance: "important" },
      { name: "MATLAB", category: "language", importance: "important" },
      { name: "CFD Analysis", category: "tool", importance: "important" },
      { name: "FEA Analysis", category: "tool", importance: "important" },
      { name: "Technical Drawing", category: "concept", importance: "critical" },
      { name: "Problem Solving", category: "soft-skill", importance: "critical" },
    ],
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    category: "Civil Engineering",
    description: "Plan, design, and construct infrastructure projects",
    requiredSkills: [
      { name: "AutoCAD", category: "tool", importance: "critical" },
      { name: "Revit", category: "tool", importance: "critical" },
      { name: "Structural Analysis", category: "concept", importance: "critical" },
      { name: "Building Design", category: "concept", importance: "critical" },
      { name: "Project Management", category: "concept", importance: "important" },
      { name: "BIM", category: "tool", importance: "important" },
      { name: "Soil Mechanics", category: "concept", importance: "important" },
      { name: "Hydraulics", category: "concept", importance: "important" },
      { name: "STAAD Pro", category: "tool", importance: "important" },
      { name: "GPS & Surveying", category: "tool", importance: "nice-to-have" },
      { name: "Technical Communication", category: "soft-skill", importance: "important" },
      { name: "Safety Management", category: "concept", importance: "critical" },
    ],
  },
  {
    id: "electrical-engineer",
    title: "Electrical Engineer",
    category: "Electrical Engineering",
    description: "Design and develop electrical systems and power solutions",
    requiredSkills: [
      { name: "Circuit Design", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "critical" },
      { name: "Simulink", category: "tool", importance: "important" },
      { name: "SPICE Simulation", category: "tool", importance: "important" },
      { name: "PSCAD", category: "tool", importance: "important" },
      { name: "Power Systems", category: "concept", importance: "critical" },
      { name: "Control Systems", category: "concept", importance: "important" },
      { name: "Signal Processing", category: "concept", importance: "important" },
      { name: "PCB Design", category: "tool", importance: "important" },
      { name: "Microcontrollers", category: "tool", importance: "important" },
      { name: "Problem Solving", category: "soft-skill", importance: "critical" },
      { name: "Technical Documentation", category: "soft-skill", importance: "important" },
    ],
  },
  {
    id: "electronics-engineer",
    title: "Electronics & Communication Engineer",
    category: "Electronics & Communication Engineering",
    description: "Develop electronic devices and communication systems",
    requiredSkills: [
      { name: "Circuit Design", category: "concept", importance: "critical" },
      { name: "Microcontrollers", category: "tool", importance: "critical" },
      { name: "Arduino", category: "tool", importance: "important" },
      { name: "Embedded Systems", category: "concept", importance: "critical" },
      { name: "Signal Processing", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "important" },
      { name: "C++", category: "language", importance: "important" },
      { name: "PCB Design", category: "tool", importance: "important" },
      { name: "Communication Theory", category: "concept", importance: "critical" },
      { name: "Wireless Systems", category: "concept", importance: "important" },
      { name: "IoT Development", category: "concept", importance: "important" },
      { name: "Testing & Debugging", category: "concept", importance: "important" },
    ],
  },
  {
    id: "aerospace-engineer",
    title: "Aerospace Engineer",
    category: "Aerospace Engineering",
    description: "Design aircraft, spacecraft, and aerospace systems",
    requiredSkills: [
      { name: "CAD Design", category: "tool", importance: "critical" },
      { name: "CATIA", category: "tool", importance: "critical" },
      { name: "Aerodynamics", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "critical" },
      { name: "CFD Analysis", category: "tool", importance: "critical" },
      { name: "Structural Analysis", category: "concept", importance: "important" },
      { name: "Control Systems", category: "concept", importance: "important" },
      { name: "Flight Mechanics", category: "concept", importance: "critical" },
      { name: "ANSYS", category: "tool", importance: "important" },
      { name: "Propulsion Systems", category: "concept", importance: "important" },
      { name: "Problem Solving", category: "soft-skill", importance: "critical" },
      { name: "Technical Writing", category: "soft-skill", importance: "important" },
    ],
  },
  {
    id: "biotech-engineer",
    title: "Biotechnology Engineer",
    category: "Biotechnology Engineering",
    description: "Apply biological science to develop biotech products and solutions",
    requiredSkills: [
      { name: "Molecular Biology", category: "concept", importance: "critical" },
      { name: "Genetic Engineering", category: "concept", importance: "critical" },
      { name: "Bioinformatics", category: "tool", importance: "important" },
      { name: "Python", category: "language", importance: "important" },
      { name: "Data Analysis", category: "concept", importance: "important" },
      { name: "Fermentation Technology", category: "concept", importance: "important" },
      { name: "Bioprocess Design", category: "concept", importance: "important" },
      { name: "Lab Techniques", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "nice-to-have" },
      { name: "Research Methods", category: "soft-skill", importance: "critical" },
      { name: "Scientific Communication", category: "soft-skill", importance: "important" },
      { name: "Regulatory Compliance", category: "concept", importance: "important" },
    ],
  },
  {
    id: "chemical-engineer",
    title: "Chemical Engineer",
    category: "Chemical Engineering",
    description: "Design and manage chemical processes and manufacturing systems",
    requiredSkills: [
      { name: "Process Design", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "critical" },
      { name: "Chemical Thermodynamics", category: "concept", importance: "critical" },
      { name: "Unit Operations", category: "concept", importance: "critical" },
      { name: "ASPEN Plus", category: "tool", importance: "important" },
      { name: "Heat Transfer", category: "concept", importance: "important" },
      { name: "Mass Transfer", category: "concept", importance: "important" },
      { name: "Process Control", category: "concept", importance: "important" },
      { name: "Fluid Mechanics", category: "concept", importance: "important" },
      { name: "Safety Management", category: "concept", importance: "critical" },
      { name: "Problem Solving", category: "soft-skill", importance: "critical" },
      { name: "Project Management", category: "soft-skill", importance: "important" },
    ],
  },
  {
    id: "automobile-engineer",
    title: "Automobile Engineer",
    category: "Automobile Engineering",
    description: "Design and develop automotive vehicles and systems",
    requiredSkills: [
      { name: "CAD Design", category: "tool", importance: "critical" },
      { name: "CATIA", category: "tool", importance: "important" },
      { name: "Engine Design", category: "concept", importance: "critical" },
      { name: "Dynamics & Control", category: "concept", importance: "important" },
      { name: "MATLAB", category: "language", importance: "important" },
      { name: "CFD Analysis", category: "tool", importance: "important" },
      { name: "FEA Analysis", category: "tool", importance: "important" },
      { name: "Thermal Management", category: "concept", importance: "important" },
      { name: "Emission Control", category: "concept", importance: "important" },
      { name: "Vehicle Safety", category: "concept", importance: "critical" },
      { name: "Problem Solving", category: "soft-skill", importance: "critical" },
      { name: "Team Collaboration", category: "soft-skill", importance: "important" },
    ],
  },
  {
    id: "robotics-engineer",
    title: "Robotics Engineer",
    category: "Robotics Engineering",
    description: "Design and develop robotic systems and automation solutions",
    requiredSkills: [
      { name: "Robotics", category: "concept", importance: "critical" },
      { name: "Control Systems", category: "concept", importance: "critical" },
      { name: "Python", category: "language", importance: "critical" },
      { name: "C++", category: "language", importance: "critical" },
      { name: "ROS", category: "tool", importance: "critical" },
      { name: "Kinematics & Dynamics", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "important" },
      { name: "CAD Design", category: "tool", importance: "important" },
      { name: "Computer Vision", category: "concept", importance: "important" },
      { name: "Machine Learning", category: "concept", importance: "important" },
      { name: "Problem Solving", category: "soft-skill", importance: "critical" },
      { name: "Team Collaboration", category: "soft-skill", importance: "important" },
    ],
  },
  {
    id: "environmental-engineer",
    title: "Environmental Engineer",
    category: "Environmental Engineering",
    description: "Develop solutions for environmental protection and sustainability",
    requiredSkills: [
      { name: "Water Treatment", category: "concept", importance: "critical" },
      { name: "Air Pollution Control", category: "concept", importance: "critical" },
      { name: "Environmental Modeling", category: "tool", importance: "important" },
      { name: "MATLAB", category: "language", importance: "important" },
      { name: "GIS Technology", category: "tool", importance: "important" },
      { name: "Waste Management", category: "concept", importance: "important" },
      { name: "Environmental Impact Assessment", category: "concept", importance: "important" },
      { name: "Sustainability", category: "concept", importance: "critical" },
      { name: "AutoCAD", category: "tool", importance: "nice-to-have" },
      { name: "Regulatory Compliance", category: "concept", importance: "critical" },
      { name: "Research Methods", category: "soft-skill", importance: "important" },
      { name: "Communication", category: "soft-skill", importance: "important" },
    ],
  },
  {
    id: "biomedical-engineer",
    title: "Biomedical Engineer",
    category: "Biomedical Engineering",
    description: "Develop medical devices and healthcare technology solutions",
    requiredSkills: [
      { name: "Medical Device Design", category: "concept", importance: "critical" },
      { name: "Biomechanics", category: "concept", importance: "critical" },
      { name: "MATLAB", category: "language", importance: "important" },
      { name: "CAD Design", category: "tool", importance: "important" },
      { name: "Signal Processing", category: "concept", importance: "important" },
      { name: "Biomedical Instrumentation", category: "concept", importance: "critical" },
      { name: "FEA Analysis", category: "tool", importance: "important" },
      { name: "Regulatory Affairs", category: "concept", importance: "critical" },
      { name: "Tissue Engineering", category: "concept", importance: "nice-to-have" },
      { name: "Research Methods", category: "soft-skill", importance: "important" },
      { name: "Technical Communication", category: "soft-skill", importance: "important" },
      { name: "Quality Assurance", category: "concept", importance: "critical" },
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
    { title: "JavaScript Essentials - Traversy Media", type: "video", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", provider: "YouTube" },
    { title: "Modern JavaScript Tutorial", type: "video", url: "https://www.youtube.com/watch?v=jS4aFq5-91M", provider: "YouTube" },
    { title: "JavaScript Fundamentals", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", provider: "MDN Web Docs" },
    { title: "The Complete JavaScript Course 2024", type: "course", url: "https://www.udemy.com/course/the-complete-javascript-course-2024/", provider: "Udemy" },
  ],
  "TypeScript": [
    { title: "TypeScript Handbook", type: "documentation", url: "https://www.typescriptlang.org/docs/", provider: "Microsoft" },
    { title: "Total TypeScript", type: "course", url: "https://www.totaltypescript.com", provider: "Matt Pocock" },
  ],
  "React": [
    { title: "React Basics - Scrimba", type: "video", url: "https://www.youtube.com/watch?v=bMknfKXILEI", provider: "YouTube" },
    { title: "React Course by freeCodeCamp", type: "video", url: "https://www.youtube.com/watch?v=SqcY0GlETPk", provider: "YouTube" },
    { title: "React Official Documentation", type: "documentation", url: "https://react.dev", provider: "Meta" },
    { title: "React Complete Guide", type: "course", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", provider: "Udemy" },
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
  "Tailwind CSS": [
    { title: "Tailwind CSS Docs", type: "documentation", url: "https://tailwindcss.com/docs", provider: "Tailwind Labs" },
    { title: "Tailwind CSS Tutorial", type: "tutorial", url: "https://tailwindcss.com/docs/utility-first", provider: "Tailwind Labs" },
  ],
  "Node.js": [
    { title: "Node.js Official Docs", type: "documentation", url: "https://nodejs.org/en/docs/", provider: "Node.js" },
    { title: "The Odin Project - Node.js", type: "course", url: "https://www.theodinproject.com/paths/full-stack-javascript", provider: "The Odin Project" },
  ],
  "Express.js": [
    { title: "Express Getting Started", type: "documentation", url: "https://expressjs.com/en/starter/installing.html", provider: "Express.js" },
    { title: "Express.js Crash Course", type: "tutorial", url: "https://expressjs.com/en/guide/routing.html", provider: "Express.js" },
  ],
  "PostgreSQL": [
    { title: "PostgreSQL Tutorial", type: "tutorial", url: "https://www.postgresqltutorial.com", provider: "PostgreSQL Tutorial" },
    { title: "PostgreSQL Docs", type: "documentation", url: "https://www.postgresql.org/docs/current/", provider: "PostgreSQL" },
  ],
  "React Native": [
    { title: "React Native Docs", type: "documentation", url: "https://reactnative.dev/docs/getting-started", provider: "Meta" },
    { title: "React Native Course", type: "course", url: "https://www.udemy.com/course/the-complete-react-native-and-redux-course/", provider: "Udemy" },
  ],
  "Pandas": [
    { title: "Pandas Official Docs", type: "documentation", url: "https://pandas.pydata.org/docs/getting_started/", provider: "pandas" },
    { title: "Kaggle Pandas Course", type: "course", url: "https://www.kaggle.com/learn/pandas", provider: "Kaggle" },
  ],
  "NumPy": [
    { title: "NumPy Quickstart", type: "documentation", url: "https://numpy.org/doc/stable/user/quickstart.html", provider: "NumPy" },
    { title: "NumPy Tutorial", type: "tutorial", url: "https://numpy.org/doc/stable/user/absolute_beginners.html", provider: "NumPy" },
  ],
  "Scikit-learn": [
    { title: "Scikit-learn User Guide", type: "documentation", url: "https://scikit-learn.org/stable/user_guide.html", provider: "Scikit-learn" },
    { title: "Kaggle Intro to ML", type: "course", url: "https://www.kaggle.com/learn/intro-to-machine-learning", provider: "Kaggle" },
  ],
  "TensorFlow": [
    { title: "TensorFlow Tutorials", type: "tutorial", url: "https://www.tensorflow.org/tutorials", provider: "Google" },
    { title: "TensorFlow Developer Certificate", type: "course", url: "https://www.coursera.org/professional-certificates/tensorflow-in-practice", provider: "Coursera" },
  ],
  "PyTorch": [
    { title: "PyTorch Tutorials", type: "tutorial", url: "https://pytorch.org/tutorials/", provider: "Meta" },
    { title: "Deep Learning with PyTorch", type: "course", url: "https://www.udacity.com/course/deep-learning-pytorch--ud188", provider: "Udacity" },
  ],
  "Figma": [
    { title: "Figma Learn", type: "tutorial", url: "https://help.figma.com/hc/en-us/categories/360002051613", provider: "Figma" },
    { title: "Figma for Beginners", type: "course", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", provider: "Figma (YouTube)" },
  ],
  "Linux": [
    { title: "Linux Journey", type: "tutorial", url: "https://linuxjourney.com", provider: "Linux Journey" },
    { title: "The Linux Command Line", type: "book", url: "https://linuxcommand.org/tlcl.php", provider: "linuxcommand.org" },
  ],
  "Bash": [
    { title: "Bash Scripting Tutorial", type: "tutorial", url: "https://linuxconfig.org/bash-scripting-tutorial-for-beginners", provider: "LinuxConfig" },
    { title: "GNU Bash Manual", type: "documentation", url: "https://www.gnu.org/software/bash/manual/", provider: "GNU" },
  ],
  "Terraform": [
    { title: "Terraform Getting Started", type: "tutorial", url: "https://developer.hashicorp.com/terraform/tutorials", provider: "HashiCorp" },
    { title: "Terraform Docs", type: "documentation", url: "https://developer.hashicorp.com/terraform/docs", provider: "HashiCorp" },
  ],
  "REST APIs": [
    { title: "RESTful API Design Guide", type: "documentation", url: "https://restfulapi.net", provider: "restfulapi.net" },
    { title: "APIs for Beginners", type: "course", url: "https://www.freecodecamp.org/news/apis-for-beginners/", provider: "freeCodeCamp" },
  ],
  "Responsive Design": [
    { title: "MDN Responsive Design", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", provider: "MDN" },
    { title: "Responsive Web Design Course", type: "course", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", provider: "freeCodeCamp" },
  ],
  "Testing": [
    { title: "Testing JavaScript", type: "course", url: "https://testingjavascript.com", provider: "Kent C. Dodds" },
    { title: "Jest Documentation", type: "documentation", url: "https://jestjs.io/docs/getting-started", provider: "Jest" },
  ],
  "Accessibility": [
    { title: "Web Accessibility by Google", type: "course", url: "https://www.udacity.com/course/web-accessibility--ud891", provider: "Udacity" },
    { title: "A11y Project Checklist", type: "documentation", url: "https://www.a11yproject.com/checklist/", provider: "A11y Project" },
  ],
  "State Management": [
    { title: "React State Management Guide", type: "tutorial", url: "https://react.dev/learn/managing-state", provider: "React" },
    { title: "Zustand Documentation", type: "documentation", url: "https://docs.pmnd.rs/zustand/getting-started/introduction", provider: "pmndrs" },
  ],
  "Authentication": [
    { title: "Auth.js Documentation", type: "documentation", url: "https://authjs.dev", provider: "Auth.js" },
    { title: "Web Authentication Guide", type: "tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API", provider: "MDN" },
  ],
  "CI/CD": [
    { title: "GitHub Actions Docs", type: "documentation", url: "https://docs.github.com/en/actions", provider: "GitHub" },
    { title: "CI/CD Tutorial", type: "tutorial", url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd", provider: "Red Hat" },
  ],
  "Statistics": [
    { title: "Khan Academy Statistics", type: "course", url: "https://www.khanacademy.org/math/statistics-probability", provider: "Khan Academy" },
    { title: "Think Stats", type: "book", url: "https://greenteapress.com/thinkstats2/html/index.html", provider: "Green Tea Press" },
  ],
  "Data Visualization": [
    { title: "D3.js Documentation", type: "documentation", url: "https://d3js.org", provider: "D3.js" },
    { title: "Storytelling with Data", type: "book", url: "https://www.storytellingwithdata.com", provider: "Cole Knaflic" },
  ],
  "Deep Learning": [
    { title: "Deep Learning Specialization", type: "course", url: "https://www.coursera.org/specializations/deep-learning", provider: "Coursera" },
    { title: "Fast.ai Course", type: "course", url: "https://course.fast.ai", provider: "fast.ai" },
  ],
  "NLP": [
    { title: "Hugging Face NLP Course", type: "course", url: "https://huggingface.co/learn/nlp-course", provider: "Hugging Face" },
    { title: "Stanford NLP Course", type: "course", url: "https://web.stanford.edu/class/cs224n/", provider: "Stanford" },
  ],
  "Networking": [
    { title: "Computer Networking Course", type: "course", url: "https://www.coursera.org/learn/computer-networking", provider: "Coursera" },
    { title: "Networking Fundamentals", type: "tutorial", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-network/", provider: "Cloudflare" },
  ],
  "Security": [
    { title: "OWASP Top Ten", type: "documentation", url: "https://owasp.org/www-project-top-ten/", provider: "OWASP" },
    { title: "Cybersecurity Fundamentals", type: "course", url: "https://www.coursera.org/learn/intro-cyber-security", provider: "Coursera" },
  ],
  "Monitoring": [
    { title: "Prometheus Docs", type: "documentation", url: "https://prometheus.io/docs/introduction/overview/", provider: "Prometheus" },
    { title: "Grafana Tutorials", type: "tutorial", url: "https://grafana.com/tutorials/", provider: "Grafana" },
  ],
  "System Design": [
    { title: "System Design Primer", type: "tutorial", url: "https://github.com/donnemartin/system-design-primer", provider: "GitHub" },
    { title: "Designing Data-Intensive Applications", type: "book", url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/", provider: "O'Reilly" },
  ],
  "Performance Optimization": [
    { title: "web.dev Performance", type: "tutorial", url: "https://web.dev/performance/", provider: "Google" },
    { title: "Chrome DevTools Guide", type: "documentation", url: "https://developer.chrome.com/docs/devtools/", provider: "Google" },
  ],
  "Deployment": [
    { title: "Vercel Deployment Docs", type: "documentation", url: "https://vercel.com/docs", provider: "Vercel" },
    { title: "Deploy with Docker", type: "tutorial", url: "https://docs.docker.com/get-started/", provider: "Docker" },
  ],
  "Azure": [
    { title: "Azure Fundamentals", type: "course", url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/", provider: "Microsoft Learn" },
    { title: "Azure Documentation", type: "documentation", url: "https://learn.microsoft.com/en-us/azure/", provider: "Microsoft" },
  ],
  "Jupyter": [
    { title: "Jupyter Docs", type: "documentation", url: "https://jupyter.org/documentation", provider: "Jupyter" },
    { title: "Jupyter Notebook Tutorial", type: "tutorial", url: "https://realpython.com/jupyter-notebook-introduction/", provider: "Real Python" },
  ],
  "MLOps": [
    { title: "MLOps Guide", type: "tutorial", url: "https://ml-ops.org", provider: "ml-ops.org" },
    { title: "Made With ML - MLOps", type: "course", url: "https://madewithml.com", provider: "Made With ML" },
  ],
  "Computer Vision": [
    { title: "OpenCV Tutorials", type: "tutorial", url: "https://docs.opencv.org/master/d9/df8/tutorial_root.html", provider: "OpenCV" },
    { title: "CS231n Stanford", type: "course", url: "https://cs231n.stanford.edu", provider: "Stanford" },
  ],
  "Data Engineering": [
    { title: "Data Engineering Zoomcamp", type: "course", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp", provider: "DataTalks.Club" },
    { title: "Apache Spark Docs", type: "documentation", url: "https://spark.apache.org/docs/latest/", provider: "Apache" },
  ],
  "User Research": [
    { title: "Nielsen Norman Group", type: "documentation", url: "https://www.nngroup.com/articles/", provider: "NN/g" },
    { title: "Google UX Design Certificate", type: "course", url: "https://www.coursera.org/professional-certificates/google-ux-design", provider: "Coursera" },
  ],
  "Wireframing": [
    { title: "Wireframing Guide", type: "tutorial", url: "https://www.figma.com/resource-library/how-to-wireframe/", provider: "Figma" },
    { title: "Balsamiq Wireframing Academy", type: "tutorial", url: "https://balsamiq.com/learn/", provider: "Balsamiq" },
  ],
  "Prototyping": [
    { title: "Figma Prototyping", type: "tutorial", url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma", provider: "Figma" },
    { title: "Prototyping Principles", type: "documentation", url: "https://www.interaction-design.org/literature/topics/prototyping", provider: "IDF" },
  ],
  "Design Systems": [
    { title: "Design Systems 101", type: "documentation", url: "https://www.nngroup.com/articles/design-systems-101/", provider: "NN/g" },
    { title: "Storybook Tutorials", type: "tutorial", url: "https://storybook.js.org/tutorials/", provider: "Storybook" },
  ],
  "Typography": [
    { title: "Practical Typography", type: "book", url: "https://practicaltypography.com", provider: "Matthew Butterick" },
    { title: "Google Fonts Knowledge", type: "documentation", url: "https://fonts.google.com/knowledge", provider: "Google" },
  ],
  "Color Theory": [
    { title: "Color Theory Fundamentals", type: "tutorial", url: "https://www.interaction-design.org/literature/topics/color-theory", provider: "IDF" },
    { title: "Coolors Color Palette", type: "practice", url: "https://coolors.co", provider: "Coolors" },
  ],
  "Interaction Design": [
    { title: "IxD Foundation", type: "documentation", url: "https://www.interaction-design.org/literature/topics/interaction-design", provider: "IDF" },
    { title: "Laws of UX", type: "tutorial", url: "https://lawsofux.com", provider: "Laws of UX" },
  ],
  "Usability Testing": [
    { title: "Usability Testing 101", type: "documentation", url: "https://www.nngroup.com/articles/usability-testing-101/", provider: "NN/g" },
    { title: "Maze Guides", type: "tutorial", url: "https://maze.co/guides/usability-testing/", provider: "Maze" },
  ],
  "Penetration Testing": [
    { title: "TryHackMe", type: "practice", url: "https://tryhackme.com", provider: "TryHackMe" },
    { title: "OWASP Testing Guide", type: "documentation", url: "https://owasp.org/www-project-web-security-testing-guide/", provider: "OWASP" },
  ],
  "Incident Response": [
    { title: "NIST IR Guide", type: "documentation", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final", provider: "NIST" },
    { title: "Incident Response Course", type: "course", url: "https://www.cybrary.it/course/incident-response-and-advanced-forensics/", provider: "Cybrary" },
  ],
  "Vulnerability Assessment": [
    { title: "Nessus Tutorials", type: "tutorial", url: "https://www.tenable.com/products/nessus", provider: "Tenable" },
    { title: "Vulnerability Management Guide", type: "documentation", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", provider: "CISA" },
  ],
  "Cryptography": [
    { title: "Crypto101", type: "book", url: "https://www.crypto101.io", provider: "Crypto101" },
    { title: "Coursera Cryptography", type: "course", url: "https://www.coursera.org/learn/crypto", provider: "Coursera" },
  ],
  "iOS Development": [
    { title: "Swift Playgrounds", type: "tutorial", url: "https://developer.apple.com/tutorials/swiftui", provider: "Apple" },
    { title: "Hacking with Swift", type: "course", url: "https://www.hackingwithswift.com", provider: "Hacking with Swift" },
  ],
  "Android Development": [
    { title: "Android Developer Guide", type: "documentation", url: "https://developer.android.com/guide", provider: "Google" },
    { title: "Android Basics in Kotlin", type: "course", url: "https://developer.android.com/courses/android-basics-kotlin/course", provider: "Google" },
  ],
  "CAD Design": [
    { title: "Introduction to CAD", type: "course", url: "https://www.coursera.org/learn/introduction-cad", provider: "Coursera" },
    { title: "CAD Fundamentals", type: "tutorial", url: "https://www.autodesk.com/learning/", provider: "Autodesk" },
  ],
  "SOLIDWORKS": [
    { title: "SOLIDWORKS Official Training", type: "documentation", url: "https://www.solidworks.com/training", provider: "Dassault Systèmes" },
    { title: "SOLIDWORKS for Beginners", type: "course", url: "https://www.udemy.com/course/solidworks-basics/", provider: "Udemy" },
  ],
  "AutoCAD": [
    { title: "AutoCAD Training", type: "documentation", url: "https://www.autodesk.com/training/autocad", provider: "Autodesk" },
    { title: "AutoCAD Course", type: "course", url: "https://www.coursera.org/learn/autocad-basics", provider: "Coursera" },
  ],
  "Thermodynamics": [
    { title: "Khan Academy Thermodynamics", type: "course", url: "https://www.khanacademy.org/science/physics/thermodynamics", provider: "Khan Academy" },
    { title: "MIT OpenCourseWare Thermodynamics", type: "course", url: "https://ocw.mit.edu/courses/", provider: "MIT" },
  ],
  "Mechanics": [
    { title: "Khan Academy Mechanics", type: "course", url: "https://www.khanacademy.org/science/physics/forces-newtons-laws", provider: "Khan Academy" },
    { title: "Mechanics Fundamentals", type: "tutorial", url: "https://www.edx.org/search?q=mechanics", provider: "edX" },
  ],
  "Fluid Dynamics": [
    { title: "Computational Fluid Dynamics Course", type: "course", url: "https://www.coursera.org/learn/computational-fluid-dynamics-cfd", provider: "Coursera" },
    { title: "Fluid Mechanics Tutorial", type: "tutorial", url: "https://www.khanacademy.org/science/physics", provider: "Khan Academy" },
  ],
  "Material Science": [
    { title: "Material Science Fundamentals", type: "course", url: "https://www.coursera.org/learn/material-science-basics", provider: "Coursera" },
    { title: "MIT Material Science Courses", type: "documentation", url: "https://ocw.mit.edu/courses/materials-science-and-engineering/", provider: "MIT" },
  ],
  "CFD Analysis": [
    { title: "ANSYS Fluent Training", type: "documentation", url: "https://www.ansys.com/products/fluids/ansys-fluent", provider: "ANSYS" },
    { title: "CFD Simulation Basics", type: "course", url: "https://www.coursera.org/learn/computational-fluid-dynamics-cfd", provider: "Coursera" },
  ],
  "FEA Analysis": [
    { title: "FEA Fundamentals", type: "documentation", url: "https://www.ansys.com/products/structures/finite-element-analysis", provider: "ANSYS" },
    { title: "Finite Element Method Course", type: "course", url: "https://www.coursera.org/learn/finite-element-method", provider: "Coursera" },
  ],
  "Technical Drawing": [
    { title: "Engineering Drawing Basics", type: "tutorial", url: "https://www.britannica.com/technology/engineering-drawing", provider: "Britannica" },
    { title: "Technical Drawing Course", type: "course", url: "https://www.udemy.com/course/technical-drawing-basics/", provider: "Udemy" },
  ],
  "Revit": [
    { title: "Revit Official Training", type: "documentation", url: "https://www.autodesk.com/training/revit", provider: "Autodesk" },
    { title: "Revit for Architects", type: "course", url: "https://www.udemy.com/course/revit-architecture/", provider: "Udemy" },
  ],
  "Structural Analysis": [
    { title: "Structural Analysis Tutorial", type: "documentation", url: "https://www.coursera.org/learn/structural-analysis", provider: "Coursera" },
    { title: "SAP2000 Training", type: "course", url: "https://www.csi-cad.com/training", provider: "CSI" },
  ],
  "Building Design": [
    { title: "Architectural Design Principles", type: "course", url: "https://www.coursera.org/learn/architectural-design", provider: "Coursera" },
    { title: "Building Design Guide", type: "documentation", url: "https://www.ashrae.org/standards-research--technology", provider: "ASHRAE" },
  ],
  "BIM": [
    { title: "Building Information Modeling", type: "documentation", url: "https://www.autodesk.com/bim/", provider: "Autodesk" },
    { title: "BIM Fundamentals Course", type: "course", url: "https://www.coursera.org/learn/bim-basics", provider: "Coursera" },
  ],
  "Soil Mechanics": [
    { title: "Soil Mechanics Course", type: "course", url: "https://www.coursera.org/learn/soil-mechanics", provider: "Coursera" },
    { title: "Geotechnical Engineering", type: "tutorial", url: "https://www.edx.org/search?q=geotechnical", provider: "edX" },
  ],
  "Hydraulics": [
    { title: "Hydraulic Systems Tutorial", type: "documentation", url: "https://www.britannica.com/technology/hydraulic", provider: "Britannica" },
    { title: "Hydraulics Course", type: "course", url: "https://www.coursera.org/learn/hydraulics", provider: "Coursera" },
  ],
  "STAAD Pro": [
    { title: "STAAD Pro Training", type: "documentation", url: "https://www.bentley.com/software/staad-pro/", provider: "Bentley" },
    { title: "STAAD Pro Tutorials", type: "tutorial", url: "https://www.youtube.com/results?search_query=STAAD+Pro+tutorials", provider: "YouTube" },
  ],
  "GPS & Surveying": [
    { title: "Surveying and Mapping Course", type: "course", url: "https://www.coursera.org/learn/surveying", provider: "Coursera" },
    { title: "GPS Technology Guide", type: "documentation", url: "https://www.usgs.gov/", provider: "USGS" },
  ],
  "Circuit Design": [
    { title: "Circuit Design Fundamentals", type: "course", url: "https://www.coursera.org/learn/circuit-design", provider: "Coursera" },
    { title: "Electronic Circuits Tutorial", type: "tutorial", url: "https://www.circuitlab.com/", provider: "CircuitLab" },
  ],
  "Simulink": [
    { title: "Simulink Documentation", type: "documentation", url: "https://www.mathworks.com/products/simulink.html", provider: "MathWorks" },
    { title: "Simulink Tutorial", type: "tutorial", url: "https://www.mathworks.com/training/", provider: "MathWorks" },
  ],
  "SPICE Simulation": [
    { title: "LTspice Tutorial", type: "tutorial", url: "https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html", provider: "Analog Devices" },
    { title: "SPICE Simulation Course", type: "course", url: "https://www.edx.org/search?q=spice+simulation", provider: "edX" },
  ],
  "PSCAD": [
    { title: "PSCAD Training", type: "documentation", url: "https://www.hvdc.ca/pscad/", provider: "HVDC" },
    { title: "Power Systems Simulation", type: "course", url: "https://www.coursera.org/learn/power-systems", provider: "Coursera" },
  ],
  "Power Systems": [
    { title: "Power Systems Fundamentals", type: "course", url: "https://www.coursera.org/learn/power-systems-fundamentals", provider: "Coursera" },
    { title: "Electric Power System Basics", type: "tutorial", url: "https://www.khanacademy.org/science", provider: "Khan Academy" },
  ],
  "Control Systems": [
    { title: "Control Systems Course", type: "course", url: "https://www.coursera.org/learn/control-systems", provider: "Coursera" },
    { title: "Control Systems Tutorial", type: "tutorial", url: "https://www.khanacademy.org/science/physics", provider: "Khan Academy" },
  ],
  "Signal Processing": [
    { title: "Digital Signal Processing", type: "course", url: "https://www.coursera.org/learn/digital-signal-processing", provider: "Coursera" },
    { title: "Signal Processing Fundamentals", type: "tutorial", url: "https://www.khanacademy.org/science", provider: "Khan Academy" },
  ],
  "PCB Design": [
    { title: "KiCad PCB Design", type: "documentation", url: "https://kicad.org/", provider: "KiCad" },
    { title: "PCB Design Course", type: "course", url: "https://www.udemy.com/course/pcb-design/", provider: "Udemy" },
  ],
  "Microcontrollers": [
    { title: "Microcontroller Tutorial", type: "documentation", url: "https://www.keil.com/microcontroller/", provider: "Keil" },
    { title: "Embedded Systems Course", type: "course", url: "https://www.coursera.org/learn/embedded-systems", provider: "Coursera" },
  ],
  "Arduino": [
    { title: "Arduino Official Documentation", type: "documentation", url: "https://www.arduino.cc/", provider: "Arduino" },
    { title: "Arduino Beginner Course", type: "course", url: "https://www.coursera.org/learn/arduino", provider: "Coursera" },
  ],
  "Embedded Systems": [
    { title: "Embedded Systems Fundamentals", type: "course", url: "https://www.coursera.org/learn/embedded-systems-programming", provider: "Coursera" },
    { title: "Embedded C Programming", type: "tutorial", url: "https://www.embeddedcraft.org/", provider: "Embedded Craft" },
  ],
  "IoT Development": [
    { title: "IoT Fundamentals", type: "course", url: "https://www.coursera.org/learn/iot-fundamentals", provider: "Coursera" },
    { title: "IoT with Arduino", type: "tutorial", url: "https://www.arduino.cc/", provider: "Arduino" },
  ],
  "CATIA": [
    { title: "CATIA Training", type: "documentation", url: "https://www.3ds.com/products-services/catia/", provider: "Dassault Systèmes" },
    { title: "CATIA for Aerospace", type: "course", url: "https://www.udemy.com/course/catia-aerospace/", provider: "Udemy" },
  ],
  "Aerodynamics": [
    { title: "Aerodynamics Course", type: "course", url: "https://www.coursera.org/learn/aerodynamics", provider: "Coursera" },
    { title: "NASA Aerodynamics Resource", type: "documentation", url: "https://www.nasa.gov/", provider: "NASA" },
  ],
  "Flight Mechanics": [
    { title: "Flight Dynamics Course", type: "course", url: "https://www.coursera.org/learn/aircraft-dynamics", provider: "Coursera" },
    { title: "Flight Mechanics Tutorial", type: "tutorial", url: "https://www.khanacademy.org/science", provider: "Khan Academy" },
  ],
  "Propulsion Systems": [
    { title: "Jet Engine Technology", type: "documentation", url: "https://www.nasa.gov/", provider: "NASA" },
    { title: "Propulsion Course", type: "course", url: "https://www.coursera.org/learn/propulsion-systems", provider: "Coursera" },
  ],
  "Molecular Biology": [
    { title: "Molecular Biology Course", type: "course", url: "https://www.coursera.org/learn/molecular-biology", provider: "Coursera" },
    { title: "Khan Academy Biology", type: "tutorial", url: "https://www.khanacademy.org/science/biology", provider: "Khan Academy" },
  ],
  "Genetic Engineering": [
    { title: "Genetic Engineering Basics", type: "course", url: "https://www.coursera.org/learn/genetic-engineering", provider: "Coursera" },
    { title: "CRISPR Technology", type: "tutorial", url: "https://www.khanacademy.org/science/biology", provider: "Khan Academy" },
  ],
  "Bioinformatics": [
    { title: "Bioinformatics Specialization", type: "course", url: "https://www.coursera.org/specializations/bioinformatics", provider: "Coursera" },
    { title: "Bioinformatics Institute", type: "documentation", url: "https://www.bioinstitute.org/", provider: "Bioinformatics Institute" },
  ],
  "Fermentation Technology": [
    { title: "Bioprocess Engineering Course", type: "course", url: "https://www.coursera.org/learn/bioprocess-engineering", provider: "Coursera" },
    { title: "Fermentation Fundamentals", type: "tutorial", url: "https://www.edx.org/search?q=fermentation", provider: "edX" },
  ],
  "Bioprocess Design": [
    { title: "Bioprocess Engineering", type: "course", url: "https://www.coursera.org/learn/bioprocess-design", provider: "Coursera" },
    { title: "Scale-up of Bioprocesses", type: "documentation", url: "https://www.edx.org/search?q=bioprocess", provider: "edX" },
  ],
  "Lab Techniques": [
    { title: "Laboratory Safety & Techniques", type: "course", url: "https://www.coursera.org/learn/laboratory-techniques", provider: "Coursera" },
    { title: "Basic Lab Skills", type: "tutorial", url: "https://www.khanacademy.org/science", provider: "Khan Academy" },
  ],
  "Research Methods": [
    { title: "Research Methods Course", type: "course", url: "https://www.coursera.org/learn/research-methods", provider: "Coursera" },
    { title: "Scientific Research Guide", type: "documentation", url: "https://www.nature.com/", provider: "Nature" },
  ],
  "Scientific Communication": [
    { title: "Scientific Writing Course", type: "course", url: "https://www.coursera.org/learn/scientific-writing", provider: "Coursera" },
    { title: "Effective Scientific Communication", type: "tutorial", url: "https://www.edx.org/search?q=scientific+communication", provider: "edX" },
  ],
  "Regulatory Compliance": [
    { title: "FDA Regulations Guide", type: "documentation", url: "https://www.fda.gov/", provider: "FDA" },
    { title: "Compliance Course", type: "course", url: "https://www.coursera.org/learn/regulatory-affairs", provider: "Coursera" },
  ],
  "Process Design": [
    { title: "Chemical Process Design", type: "course", url: "https://www.coursera.org/learn/process-design", provider: "Coursera" },
    { title: "Process Engineering Basics", type: "tutorial", url: "https://www.edx.org/search?q=process+design", provider: "edX" },
  ],
  "Chemical Thermodynamics": [
    { title: "Thermodynamics & Kinetics", type: "course", url: "https://www.coursera.org/learn/thermodynamics", provider: "Coursera" },
    { title: "Chemical Thermodynamics", type: "documentation", url: "https://ocw.mit.edu/courses/", provider: "MIT" },
  ],
  "Unit Operations": [
    { title: "Unit Operations Course", type: "course", url: "https://www.coursera.org/learn/unit-operations", provider: "Coursera" },
    { title: "Chemical Engineering Basics", type: "tutorial", url: "https://www.edx.org/search?q=unit+operations", provider: "edX" },
  ],
  "ASPEN Plus": [
    { title: "ASPEN Plus Training", type: "documentation", url: "https://www.aspentech.com/", provider: "AspenTech" },
    { title: "Process Simulation Course", type: "course", url: "https://www.udemy.com/course/aspen-plus/", provider: "Udemy" },
  ],
  "Heat Transfer": [
    { title: "Heat Transfer Fundamentals", type: "course", url: "https://www.coursera.org/learn/heat-transfer", provider: "Coursera" },
    { title: "Heat Transfer Tutorial", type: "tutorial", url: "https://www.khanacademy.org/science/physics", provider: "Khan Academy" },
  ],
  "Mass Transfer": [
    { title: "Mass Transfer Course", type: "course", url: "https://www.coursera.org/learn/mass-transfer", provider: "Coursera" },
    { title: "Diffusion & Mass Transfer", type: "documentation", url: "https://ocw.mit.edu/courses/", provider: "MIT" },
  ],
  "Process Control": [
    { title: "Process Control Course", type: "course", url: "https://www.coursera.org/learn/process-control", provider: "Coursera" },
    { title: "Control Systems Basics", type: "tutorial", url: "https://www.edx.org/search?q=process+control", provider: "edX" },
  ],
  "Engine Design": [
    { title: "Internal Combustion Engines", type: "course", url: "https://www.coursera.org/learn/engine-design", provider: "Coursera" },
    { title: "Engine Fundamentals", type: "documentation", url: "https://www.edx.org/search?q=engine+design", provider: "edX" },
  ],
  "Dynamics & Control": [
    { title: "Vehicle Dynamics Course", type: "course", url: "https://www.coursera.org/learn/vehicle-dynamics", provider: "Coursera" },
    { title: "Control Systems for Vehicles", type: "tutorial", url: "https://www.edx.org/search?q=vehicle+dynamics", provider: "edX" },
  ],
  "Thermal Management": [
    { title: "Thermal Management in Vehicles", type: "documentation", url: "https://www.sae.org/", provider: "SAE" },
    { title: "Heat Management Course", type: "course", url: "https://www.coursera.org/learn/thermal-systems", provider: "Coursera" },
  ],
  "Emission Control": [
    { title: "Emission Standards Guide", type: "documentation", url: "https://www.epa.gov/", provider: "EPA" },
    { title: "Environmental Regulations", type: "course", url: "https://www.coursera.org/learn/environmental-compliance", provider: "Coursera" },
  ],
  "Vehicle Safety": [
    { title: "Automotive Safety Standards", type: "documentation", url: "https://www.nhtsa.gov/", provider: "NHTSA" },
    { title: "Crash Test & Safety", type: "course", url: "https://www.coursera.org/learn/vehicle-safety", provider: "Coursera" },
  ],
  "ROS": [
    { title: "ROS Official Documentation", type: "documentation", url: "https://www.ros.org/", provider: "Open Robotics" },
    { title: "ROS Tutorials", type: "tutorial", url: "https://wiki.ros.org/ROS/Tutorials", provider: "ROS Wiki" },
  ],
  "Kinematics & Dynamics": [
    { title: "Robot Kinematics Course", type: "course", url: "https://www.coursera.org/learn/kinematics-robotics", provider: "Coursera" },
    { title: "Dynamics of Robots", type: "documentation", url: "https://robotics.stanford.edu/", provider: "Stanford Robotics Lab" },
  ],
  "Computer Vision": [
    { title: "Computer Vision Specialization", type: "course", url: "https://www.coursera.org/specializations/computer-vision", provider: "Coursera" },
    { title: "OpenCV Tutorials", type: "documentation", url: "https://docs.opencv.org/", provider: "OpenCV" },
  ],
  "Machine Learning": [
    { title: "Machine Learning Specialization", type: "course", url: "https://www.coursera.org/specializations/machine-learning", provider: "Coursera" },
    { title: "Scikit-learn Documentation", type: "documentation", url: "https://scikit-learn.org/", provider: "Scikit-learn" },
  ],
  "Water Treatment": [
    { title: "Water Treatment Basics", type: "course", url: "https://www.coursera.org/learn/water-treatment", provider: "Coursera" },
    { title: "EPA Water Quality", type: "documentation", url: "https://www.epa.gov/water", provider: "EPA" },
  ],
  "Air Pollution Control": [
    { title: "Air Quality & Pollution Control", type: "course", url: "https://www.coursera.org/learn/air-pollution", provider: "Coursera" },
    { title: "EPA Air Quality", type: "documentation", url: "https://www.epa.gov/air-quality", provider: "EPA" },
  ],
  "Environmental Modeling": [
    { title: "Environmental Modeling Course", type: "course", url: "https://www.coursera.org/learn/environmental-modeling", provider: "Coursera" },
    { title: "GIS Environmental Analysis", type: "tutorial", url: "https://www.esri.com/en-us/arcgis/", provider: "ESRI" },
  ],
  "GIS Technology": [
    { title: "GIS Fundamentals", type: "course", url: "https://www.coursera.org/learn/gis-fundamentals", provider: "Coursera" },
    { title: "ArcGIS Training", type: "documentation", url: "https://www.esri.com/en-us/training/", provider: "ESRI" },
  ],
  "Waste Management": [
    { title: "Waste Management Course", type: "course", url: "https://www.coursera.org/learn/waste-management", provider: "Coursera" },
    { title: "Recycling & Sustainability", type: "tutorial", url: "https://www.epa.gov/waste", provider: "EPA" },
  ],
  "Environmental Impact Assessment": [
    { title: "EIA Course", type: "course", url: "https://www.coursera.org/learn/environmental-impact", provider: "Coursera" },
    { title: "Environmental Law", type: "documentation", url: "https://www.epa.gov/laws-regulations", provider: "EPA" },
  ],
  "Sustainability": [
    { title: "Sustainable Development Course", type: "course", url: "https://www.coursera.org/learn/sustainability", provider: "Coursera" },
    { title: "UN Sustainable Development Goals", type: "documentation", url: "https://sdgs.un.org/", provider: "UN" },
  ],
  "Medical Device Design": [
    { title: "Medical Device Design Course", type: "course", url: "https://www.coursera.org/learn/medical-device-design", provider: "Coursera" },
    { title: "FDA Device Regulations", type: "documentation", url: "https://www.fda.gov/medical-devices/", provider: "FDA" },
  ],
  "Biomechanics": [
    { title: "Biomechanics Course", type: "course", url: "https://www.coursera.org/learn/biomechanics", provider: "Coursera" },
    { title: "Human Movement Analysis", type: "tutorial", url: "https://www.khanacademy.org/science/health-and-medicine", provider: "Khan Academy" },
  ],
  "Biomedical Instrumentation": [
    { title: "Medical Instrumentation Course", type: "course", url: "https://www.coursera.org/learn/biomedical-instrumentation", provider: "Coursera" },
    { title: "Biosignal Processing", type: "documentation", url: "https://www.edx.org/search?q=biomedical+instrumentation", provider: "edX" },
  ],
  "Tissue Engineering": [
    { title: "Tissue Engineering Course", type: "course", url: "https://www.coursera.org/learn/tissue-engineering", provider: "Coursera" },
    { title: "Regenerative Medicine", type: "documentation", url: "https://www.edx.org/search?q=tissue+engineering", provider: "edX" },
  ],
  "Quality Assurance": [
    { title: "QA & Quality Control", type: "course", url: "https://www.coursera.org/learn/quality-assurance", provider: "Coursera" },
    { title: "ISO Standards Guide", type: "documentation", url: "https://www.iso.org/", provider: "ISO" },
  ],
  "Windows Server": [
    { title: "Microsoft Learn - Windows Server", type: "documentation", url: "https://learn.microsoft.com/en-us/windows-server/", provider: "Microsoft" },
    { title: "Windows Server Administration Course", type: "course", url: "https://www.linkedin.com/learning/windows-server-administration-essential-knowledge", provider: "LinkedIn Learning" },
  ],
  "Active Directory": [
    { title: "Active Directory Documentation", type: "documentation", url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services", provider: "Microsoft" },
    { title: "Active Directory Training", type: "course", url: "https://www.cbtnuggets.com/learn/it-training/microsoft-active-directory", provider: "CBT Nuggets" },
  ],
  "Cloud Services": [
    { title: "Cloud Computing Guide", type: "documentation", url: "https://cloud.google.com/learn/what-is-cloud-computing", provider: "Google Cloud" },
    { title: "Cloud Computing Fundamentals", type: "course", url: "https://www.coursera.org/learn/cloud-computing", provider: "Coursera" },
  ],
  "Cybersecurity": [
    { title: "NIST Cybersecurity Framework", type: "documentation", url: "https://www.nist.gov/cyberframework", provider: "NIST" },
    { title: "Cybersecurity Essentials", type: "course", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry-level-certifications/cybersecurity-essentials.html", provider: "Cisco" },
  ],
  "Backup & Recovery": [
    { title: "Backup Strategies Guide", type: "documentation", url: "https://learn.microsoft.com/en-us/windows-server/storage/storage-overview", provider: "Microsoft" },
    { title: "Disaster Recovery Planning", type: "tutorial", url: "https://www.ibm.com/topics/disaster-recovery", provider: "IBM" },
  ],
  "System Monitoring": [
    { title: "Prometheus Documentation", type: "documentation", url: "https://prometheus.io/docs/", provider: "Prometheus" },
    { title: "System Monitoring with Grafana", type: "tutorial", url: "https://grafana.com/tutorials/", provider: "Grafana" },
  ],
  "Help Desk Support": [
    { title: "ITIL Foundations", type: "course", url: "https://www.axelos.com/certifications/itil-foundation", provider: "AXELOS" },
    { title: "Customer Support Best Practices", type: "tutorial", url: "https://www.zendesk.com/blog/support-skills/", provider: "Zendesk" },
  ],
  "Technical Communication": [
    { title: "Technical Writing Course", type: "course", url: "https://www.coursera.org/learn/technical-writing", provider: "Coursera" },
    { title: "Communication Skills for IT", type: "tutorial", url: "https://www.linkedin.com/learning/communication-skills-for-it-professionals", provider: "LinkedIn Learning" },
  ],
  "Troubleshooting": [
    { title: "Troubleshooting Skills Guide", type: "tutorial", url: "https://www.comptia.org/certifications/a", provider: "CompTIA A+" },
    { title: "Effective Problem Solving", type: "course", url: "https://www.coursera.org/learn/problem-solving", provider: "Coursera" },
  ],
}

function getDefaultResources(skillName: string): Resource[] {
  const encoded = encodeURIComponent(skillName)
  return [
    { title: `${skillName} - Roadmap.sh Guide`, type: "documentation", url: `https://roadmap.sh/search?q=${encoded}`, provider: "roadmap.sh" },
    { title: `Learn ${skillName} - freeCodeCamp`, type: "course", url: `https://www.freecodecamp.org/news/search/?query=${encoded}`, provider: "freeCodeCamp" },
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
