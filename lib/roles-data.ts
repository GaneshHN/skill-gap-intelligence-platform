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
