import { Certificate, EducationItem, ExperienceItem, Project, SkillGroup, BlogArticle } from '../types';

/**
 * Resolves static asset paths with Vite's configured base path.
 * Ensures assets load correctly on GitHub Pages under subpaths (e.g. /PORTFOLIO_WEBSITE/).
 */
export const getAssetUrl = (relativePath: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${cleanBase}${cleanPath}`;
};

export const PERSONAL_INFO = {
  name: 'Bala Sabareesh P',
  role: 'Software Developer | AI & Full Stack',
  title: 'B.E. Computer Science and Engineering Undergraduate',
  college: 'K S Rangasamy College of Technology',
  cgpa: '8.1 / 10',
  expectedGraduation: '2027',
  location: 'Tamil Nadu, India',
  email: 'balasabareeshp@gmail.com',
  phone: '+91 9751053093',
  targetRole: 'Entry-level Software Engineer / Associate Software Engineer',
  summary:
    'Computer Science undergraduate (CGPA 8.1/10, expected 2027) with strong fundamentals in Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), and REST API design. Shipped 3+ full-stack and Agentic AI applications and completed two certified internships in Java/Spring Boot and Flutter development. Proficient across Java, Python, and JavaScript (React.js, Node.js, Express.js) technology stacks, with hands-on SDLC experience and a fast-learning track record.',
  careerDirection:
    'Seeking an entry-level Software Engineer / Associate Software Engineer role to apply core CS fundamentals and full-stack engineering skills to client-facing enterprise projects.',
  socials: {
    github: 'https://github.com/BALA-SABAREESH',
    linkedin: 'https://www.linkedin.com/in/bala-sabareesh-p-80b74a357',
    leetcode: 'https://leetcode.com/u/Balasabareesh/',
    oldPortfolio: 'https://bala-sabareesh.github.io/Portfolio/'
  },
  resumePath: getAssetUrl('Bala_Sabareesh_P_Resume.pdf'),
  photoPath: getAssetUrl('assets/bala_sabareesh_p.jpeg')
};

export const PROJECTS: Project[] = [
  {
    id: 'job-recommendation-system',
    title: 'Job Recommendation System',
    subtitle: 'Skill-Matching Career Intelligence Platform with Automated Resume Ranking',
    period: '2026',
    category: 'Full Stack',
    featured: true,
    badge: 'Enterprise Architecture',
    description:
      'Engineered a comprehensive full-stack job platform with secure JWT authentication, multi-criteria resume uploads, application status tracking, and a 5-module administrative dashboard.',
    problemSolved:
      'Traditional job boards present high noise-to-signal ratios for both applicants and recruiters. This system automates candidate-to-position skill mapping and streamlines recruitment pipeline oversight.',
    features: [
      'Devised and implemented a skill-based matching algorithm calculating precision job-match percentages across 100+ sample job listings.',
      'Constructed and normalized a relational MySQL schema with Drizzle ORM spanning 6+ relational tables, eliminating duplicate queries and guaranteeing atomic data consistency.',
      'Designed a secure role-based JWT authentication system with encrypted session management and granular permission controls.',
      'Built interactive applicant tracking modules with real-time status updates and recruiter dashboard analytics.'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Drizzle ORM', 'JWT', 'REST API'],
    architectureHighlights: [
      'Drizzle ORM query layer optimized with foreign key constraints and indexed joins',
      'Stateless JWT session tokens verified via Express middleware pipeline',
      'Deterministic string-vector tokenization for skill score computation',
      'Modular client-side state architecture with zero redundant network queries'
    ],
    githubUrl: 'https://github.com/BALA-SABAREESH'
  },
  {
    id: 'learning-management-system',
    title: 'Learning Management System (LMS)',
    subtitle: 'Dual-Role Educational Platform for Curriculum Delivery & Grading Workflows',
    period: '2026',
    category: 'Full Stack',
    featured: true,
    badge: 'Production Shipped',
    description:
      'Architected a production full-stack LMS supporting dual user roles (student and instructor) to administer course syllabi, assignments, student submissions, and real-time academic progress tracking.',
    problemSolved:
      'Academic assessment workflows suffer from manual submission bottlenecks and fragmented instructor feedback channels. This LMS establishes an integrated submission and grading cycle.',
    features: [
      'Structured fine-grained role-based access control (RBAC) to streamline assignment submission and grading workflows, eliminating manual steps.',
      'Created front end, back end, database schema, and REST APIs end-to-end, then deployed the completed application to production.',
      'Engineered course lifecycle management with instructor publishing tools and student enrollment modules.',
      'Real-time student progress tracking visualizers providing transparent completion metrics.'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'CSS3'],
    architectureHighlights: [
      'End-to-end RESTful API contracts with standardized JSON error payloads',
      'Strict relational database integrity rules separating instructor and student entity trees',
      'Production deployment with optimized static asset bundling and proxy routing',
      'Responsive UI layouts designed for both desktop lecture viewing and mobile review'
    ],
    githubUrl: 'https://github.com/BALA-SABAREESH'
  },
  {
    id: 'personal-productivity-assistant',
    title: 'Personal Productivity Assistant',
    subtitle: 'Autonomous Task Orchestrator Powered by Agentic AI & Stateful Execution Graphs',
    period: '2026',
    category: 'Agentic AI',
    featured: true,
    badge: 'Agentic AI',
    description:
      'Developed an intelligent task-reminder agent using Agentic AI (LangChain & LangGraph) that autonomously creates, prioritizes, decomposes, and tracks daily tasks through natural-language conversation.',
    problemSolved:
      'Manual calendar entries and static todo lists require repetitive user input and lack context-aware prioritization. This assistant evaluates urgency, schedules dynamic reminders, and resolves scheduling conflicts conversationally.',
    features: [
      'Orchestrated multi-step decision workflows using LangGraph state graphs with conditional branching and stateful agent memory.',
      'Crafted a lightweight, responsive web front end to interact with the agent, translating conversational input into structured task-management actions in real time.',
      'Integrated tool-calling agents capable of parsing temporal language ("schedule review tomorrow at 4 PM") into ISO timestamp executions.',
      'Designed human-in-the-loop validation triggers before confirming critical task updates or deletions.'
    ],
    techStack: ['Python', 'LangChain', 'LangGraph', 'Agentic AI', 'HTML', 'CSS', 'JavaScript'],
    architectureHighlights: [
      'Stateful graph architecture allowing cycles and conditional re-planning loops',
      'Prompt engineering with Pydantic output schemas guaranteeing valid JSON parameters',
      'Lightweight asynchronous frontend bridging browser input with the backend execution loop',
      'Real-time thought stream visualization showing agent reasoning steps'
    ],
    githubUrl: 'https://github.com/BALA-SABAREESH'
  },
  {
    id: 'neopay-wallet-flutter',
    title: 'Neopay Wallet — Multi-Screen Mobile Application',
    subtitle: 'Fintech Mobile Application with Real-Time Transfer & Dynamic Transaction Ledger',
    period: '2026',
    category: 'Mobile',
    featured: true,
    badge: 'Flutter Mobile App',
    description:
      'Built a multi-screen fintech mobile app in Flutter with bottom-navigation across Home, Transactions, and Profile screens driven by a centralized app state.',
    problemSolved:
      'Modern fintech users expect instant balance reconciliation and low-latency transaction feedback. Neopay Wallet decouples state persistence from screen navigation to ensure atomic balance consistency and zero UI stutter.',
    features: [
      'Built a multi-screen fintech mobile app in Flutter with bottom-navigation across Home, Transactions, and Profile screens driven by a centralized app state.',
      'Implemented a fully validated Transfer/Withdraw flow (form validation, error handling) that updates account balance and transaction history in real time.',
      'Developed a searchable, filterable transaction history screen and reusable UI components to reduce code duplication.'
    ],
    techStack: ['Flutter', 'Dart', 'Android Studio', 'State Management', 'Git'],
    architectureHighlights: [
      'Centralized reactive state container driving real-time balance updates across multiple views',
      'Robust form validation with input sanitation and granular balance boundary checks',
      'Custom reusable widget design system adhering to Android & iOS mobile interaction ergonomics',
      'Fast-indexing search and category filtering for high-throughput transaction histories'
    ],
    githubUrl: 'https://github.com/BALA-SABAREESH/Flutter_projects'
  },
  {
    id: 'amazon-ecommerce-prototype-uiux',
    title: 'Amazon Comprehensive E-Commerce Interactive Prototype',
    subtitle: 'Multi-Page High-Fidelity UI/UX Architecture & Production Design System',
    period: '2026',
    category: 'UI/UX',
    featured: true,
    badge: 'UI/UX Prototype',
    description:
      'Developed an extensive multi-page interface prototype mapping the entire user acquisition journey from landing, search filtering, cart states, to mock checkouts.',
    problemSolved:
      'Complex multi-category e-commerce platforms suffer from checkout drop-offs and inconsistent cross-platform layout variables. This architecture provides frictionless end-to-end journey maps with rigorous design token standardization.',
    features: [
      'Developed an extensive multi-page interface prototype mapping the entire user acquisition journey from landing, search filtering, cart states, to mock checkouts.',
      'Created clean architectural design components and design tokens inside Figma to streamline cross-team technical handoffs directly to production layout variables.',
      'Designed responsive grid scaling strategies ensuring layout stability across smartphone, tablet, and widescreen viewports.'
    ],
    techStack: ['Figma', 'User Experience Blueprinting', 'Wireframing', 'Responsive Grid Scaling', 'Design Tokens'],
    architectureHighlights: [
      'Comprehensive design token repository spanning standardized spacing, typography, and optical color scales',
      'End-to-end user acquisition journey wireframing from catalogue discovery to order placement',
      'Component-driven atomic architecture ensuring effortless developer-to-designer handoffs',
      'Mobile-first responsive fluid grids adapting dynamically across diverse viewport sizes'
    ],
    githubUrl: 'https://github.com/BALA-SABAREESH'
  }
];

export const CERTIFICATIONS: Certificate[] = [
  {
    id: 'uipath-automation-developer',
    title: 'UiPath Professional Automation Developer Associate Certification',
    issuer: 'UiPath Certified Professional',
    issueDate: 'May 6, 2026',
    credentialId: '005419',
    verificationNote: 'Issued under authorization of Daniel Dines, Founder & CEO',
    verifiedSigner: 'Daniel Dines (Founder and CEO)',
    image: getAssetUrl('assets/uipath_certificate.svg'),
    category: 'RPA & Enterprise Automation',
    summary:
      'Official credential demonstrating comprehensive competence in enterprise robotic process automation (RPA), workflow orchestration, automated UI interactions, error handling, and automation solution architecture.'
  },
  {
    id: 'oracle-ai-foundations',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle University',
    issueDate: 'Nov 16, 2025',
    credentialId: '103211224OCI25AICFA',
    verificationNote: 'Certified Associate credential issued by Oracle University',
    verifiedSigner: 'Oracle Worldwide Certification Authority',
    image: getAssetUrl('assets/oracle_certificate.jpeg'),
    category: 'Artificial Intelligence & Cloud',
    summary:
      'Validates foundational mastery of artificial intelligence and machine learning principles within cloud environments, covering Deep Learning, Large Language Models, OCI AI services, and enterprise model deployment.'
  },
  {
    id: 'ibm-web-development',
    title: 'Web Development Fundamentals – IBM',
    issuer: 'IBM SkillsBuild',
    issueDate: 'Feb 05, 2026',
    credentialId: 'Verified via Credly',
    verificationNote: 'Verified digital credential issued by IBM SkillsBuild via Credly',
    verifiedSigner: 'IBM SkillsBuild Academic Division',
    image: getAssetUrl('assets/ibm_certificate.jpeg'),
    category: 'Full Stack & Web Technologies',
    summary:
      'Certified proficiency in core web architecture, frontend component construction, modern HTTP/REST request pipelines, semantic HTML5/CSS3 standards, and responsive web application development.'
  },
  {
    id: 'google-gemini-student',
    title: 'Gemini Certified Student – University',
    issuer: 'Google for Education',
    issueDate: 'Sep 12, 2025',
    credentialId: 'Valid through Sep 12, 2028',
    verificationNote: 'Official credential issued by Google for Education',
    verifiedSigner: 'Google for Education Student Certification',
    image: getAssetUrl('assets/google_gemini_certificate.jpeg'),
    category: 'Generative AI & Machine Learning',
    summary:
      'Accredited certification recognizing expertise in applied Generative AI models, prompt engineering methodologies, responsible AI ethics, and developer workflows using Google AI ecosystems.'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'aicte-eduskills',
    role: 'Java Full Stack Development Intern',
    company: 'AICTE EduSkills',
    period: 'Jan 2026 – Mar 2026',
    type: 'Certified Internship Program',
    highlights: [
      'Completed a certified full-stack development program covering Java, Spring Boot, relational databases, and web application development across 8+ weeks of intensive coursework.',
      'Developed and unit-tested 4+ backend modules in Java and Spring Boot, applying OOP principles and REST API design patterns within an Agile-style, sprint-based curriculum.',
      'Built relational data schemas, wrote optimized SQL joins, and established secure database connection layers for enterprise service modules.',
      'Participated in code reviews, peer refactoring sessions, and software testing practices to uphold clean architectural standards.'
    ],
    technologies: ['Java', 'Spring Boot', 'Relational Databases', 'SQL', 'REST APIs', 'Agile / SDLC', 'OOP']
  },
  {
    id: 'coreverse-flutter',
    role: 'Flutter Development Intern',
    company: 'Coreverse',
    period: 'Dec 2024 – Jan 2025',
    type: 'Certified Mobile Internship',
    highlights: [
      'Delivered 2 cross-platform mobile applications using Flutter and Dart, implementing 10+ custom UI screens as part of a certified mobile app development internship.',
      'Implemented state management and debugged app architecture across Android and iOS builds, reducing UI rendering issues during QA cycles.',
      'Optimized widget tree lifecycles to ensure high frame-rate responsiveness across both budget and flagship smartphone hardware.',
      'Integrated backend REST endpoints with clean serialization models and graceful offline error handling.'
    ],
    technologies: ['Flutter', 'Dart', 'Android', 'iOS', 'State Management', 'Mobile UI/UX', 'QA Debugging']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'ksr-college',
    institution: 'K S Rangasamy College of Technology',
    degree: 'B.E., Computer Science and Engineering',
    period: '2023 – 2027',
    grade: '8.1 / 10',
    gradeLabel: 'CGPA',
    details:
      'Rigorous foundational coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Operating Systems, Computer Networks, and Software Engineering.'
  },
  {
    id: 'reliance-school',
    institution: 'Reliance Matriculation Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2022 – 2023',
    grade: '74%',
    gradeLabel: 'Percentage',
    details: 'Higher secondary education focusing on Mathematics, Physics, Chemistry, and Computer Science fundamentals.'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    description: 'Core languages utilized for software architecture and algorithm implementation.',
    skills: [
      { name: 'Java', level: 'Strong', highlight: true },
      { name: 'Python', level: 'Strong', highlight: true },
      { name: 'JavaScript', level: 'Strong', highlight: true },
      { name: 'C', level: 'Working Knowledge' }
    ]
  },
  {
    category: 'Frontend Engineering',
    description: 'Technologies used to engineer responsive, accessible, and high-performance user interfaces.',
    skills: [
      { name: 'React.js', level: 'Strong', highlight: true },
      { name: 'HTML5', level: 'Strong' },
      { name: 'CSS3 / Tailwind CSS', level: 'Strong', highlight: true },
      { name: 'Bootstrap', level: 'Working Knowledge' },
      { name: 'UI & UX Design', level: 'Working Knowledge' }
    ]
  },
  {
    category: 'Backend & APIs',
    description: 'Server-side runtimes, frameworks, and interface contracts for enterprise services.',
    skills: [
      { name: 'Node.js', level: 'Strong', highlight: true },
      { name: 'Express.js', level: 'Strong', highlight: true },
      { name: 'Spring Boot', level: 'Working Knowledge', highlight: true },
      { name: 'REST API Design', level: 'Strong' },
      { name: 'JWT Authentication', level: 'Strong' }
    ]
  },
  {
    category: 'Databases & ORM',
    description: 'Relational data structures, query design, normalization, and object-relational mapping.',
    skills: [
      { name: 'MySQL', level: 'Strong', highlight: true },
      { name: 'SQL', level: 'Strong' },
      { name: 'Drizzle ORM', level: 'Working Knowledge', highlight: true },
      { name: 'Database Normalization', level: 'Strong' }
    ]
  },
  {
    category: 'AI / Machine Learning',
    description: 'Applied modern generative AI, agentic graph systems, and machine learning fundamentals.',
    skills: [
      { name: 'Agentic AI', level: 'Working Knowledge', highlight: true },
      { name: 'LangChain', level: 'Working Knowledge', highlight: true },
      { name: 'LangGraph', level: 'Working Knowledge', highlight: true },
      { name: 'ML Fundamentals', level: 'Intermediate' }
    ]
  },
  {
    category: 'Tools & Platforms',
    description: 'Version control, developer environments, mobile SDKs, and deployment infrastructure.',
    skills: [
      { name: 'Git & GitHub', level: 'Strong', highlight: true },
      { name: 'VS Code', level: 'Strong' },
      { name: 'IntelliJ IDEA', level: 'Working Knowledge' },
      { name: 'Flutter & Dart', level: 'Working Knowledge' },
      { name: 'Figma', level: 'Intermediate' },
      { name: 'Netlify', level: 'Working Knowledge' },
      { name: 'Power BI', level: 'Familiar' }
    ]
  },
  {
    category: 'Soft Skills & Engineering Practices',
    description: 'Collaborative methodologies and cognitive problem-solving capabilities.',
    skills: [
      { name: 'Problem Solving', level: 'Strong', highlight: true },
      { name: 'Data Structures & Algorithms', level: 'Strong', highlight: true },
      { name: 'Object-Oriented Programming (OOP)', level: 'Strong', highlight: true },
      { name: 'SDLC & Agile Workflows', level: 'Working Knowledge' },
      { name: 'Team Collaboration', level: 'Strong' },
      { name: 'Communication', level: 'Strong' },
      { name: 'Fast Learning', level: 'Strong' }
    ]
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'agentic-ai-task-orchestrator',
    slug: 'agentic-ai-langgraph-task-orchestrator',
    title: 'Architecting an Autonomous Task Assistant with LangChain & LangGraph',
    excerpt:
      'A deep dive into stateful cyclic graph workflows, deterministic tool invocation, and human-in-the-loop task execution based on my Personal Productivity Assistant project.',
    date: 'March 2026',
    readTime: '6 min read',
    category: 'Agentic AI',
    tags: ['Agentic AI', 'Python', 'LangGraph', 'LangChain', 'System Design'],
    sections: [
      {
        heading: 'Why Traditional Linear Chains Fall Short in Task Management',
        text: 'Standard linear LLM chains (Prompt -> Completion) break down when handling real-world task schedules. Scheduling an event or updating a priority requires checking existing constraints, resolving date ambiguities, and backtracking if a conflict occurs. In standard chains, errors compound and generate hallucinated resolutions.'
      },
      {
        heading: 'Transitioning to Stateful Graphs with LangGraph',
        text: 'To solve this in my Personal Productivity Assistant, I adopted LangGraph to model task scheduling as a state machine. The state maintains the user conversation history, extracted task entities, and active execution flags.',
        codeSnippet: {
          language: 'python',
          code: `from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], "add_messages"]
    pending_task: dict | None
    requires_confirmation: bool

# Define nodes for intent extraction, calendar query, and mutation
workflow = StateGraph(AgentState)
workflow.add_node("parse_intent", parse_intent_node)
workflow.add_node("validate_schedule", validate_schedule_node)
workflow.add_node("execute_mutation", execute_mutation_node)

# Conditional edge evaluating schedule feasibility
workflow.add_conditional_edges(
    "validate_schedule",
    check_conflict_condition,
    {"conflict": "parse_intent", "feasible": "execute_mutation"}
)`
        }
      },
      {
        heading: 'Human-in-the-Loop Safeguards',
        text: 'A core tenet of responsible Agentic AI is ensuring irreversible actions (deleting recurring tasks, mass-updating agendas) require explicit confirmation. By setting an execution checkpoint in the LangGraph runner, the system suspends state and resumes only upon user approval.',
        bullets: [
          'State persistence across multi-turn clarification dialogs',
          'Deterministic JSON parameter extraction with Pydantic validation',
          'Low-latency asynchronous front-end communicating via Server-Sent Events',
          'Graceful fallbacks when natural-language dates are ambiguous'
        ]
      }
    ]
  },
  {
    id: 'drizzle-orm-mysql-schema-design',
    slug: 'drizzle-orm-mysql-schema-normalization',
    title: 'Designing Scalable Relational Schemas with Drizzle ORM and MySQL',
    excerpt:
      'Architectural principles of database normalization, composite indexes, and type-safe query construction learned while engineering the Job Recommendation System.',
    date: 'February 2026',
    readTime: '5 min read',
    category: 'Database Architecture',
    tags: ['MySQL', 'Drizzle ORM', 'TypeScript', 'Node.js', 'Performance'],
    sections: [
      {
        heading: 'The Challenge: 6+ Relational Tables with Real-Time Skill Matching',
        text: 'When developing the Job Recommendation System, the core technical bottleneck was computing job-match percentages across 100+ positions without initiating redundant N+1 SQL queries or locking tables during candidate resume uploads.'
      },
      {
        heading: 'Type-Safe Schema Definition with Drizzle ORM',
        text: 'Drizzle ORM bridges the gap between raw SQL performance and TypeScript compile-time guarantees. Unlike heavy traditional ORMs, Drizzle compiles directly to predictable SQL queries.',
        codeSnippet: {
          language: 'typescript',
          code: `import { mysqlTable, varchar, text, timestamp, int, index } from 'drizzle-orm/mysql-core';

export const jobsTable = mysqlTable('jobs', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  requiredSkills: text('required_skills').notNull(), // Comma-separated or JSON tokens
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => ({
  companyIdx: index('company_idx').on(table.company)
}));`
        }
      },
      {
        heading: 'Key Takeaways from Normalization to 3NF',
        text: 'By normalizing candidate skills, job postings, and application records into third normal form (3NF), we eliminated duplicate storage, streamlined indexing, and enabled instantaneous algorithmic score computations on the backend.'
      }
    ]
  },
  {
    id: 'enterprise-java-spring-boot-modules',
    slug: 'enterprise-java-spring-boot-architecture',
    title: 'Deep Dive: Building Enterprise Backend Modules with Java & Spring Boot',
    excerpt:
      'Exploring clean OOP abstractions, RESTful conventions, dependency injection, and test-driven development from my AICTE EduSkills internship.',
    date: 'January 2026',
    readTime: '7 min read',
    category: 'Java / Spring',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'OOP', 'Enterprise'],
    sections: [
      {
        heading: 'Foundational Principles of Enterprise Java Development',
        text: 'During my 8-week full-stack internship with AICTE EduSkills, I developed and unit-tested 4+ backend modules. The primary takeaway was understanding how decoupled enterprise architectures leverage inversion of control (IoC) and dependency injection.'
      },
      {
        heading: 'REST Controller & Service Layer Separation',
        text: 'A clean Spring Boot application strictly separates HTTP serialization concerns from underlying business rules. Controllers never touch repositories directly; they delegate to testable service classes.',
        codeSnippet: {
          language: 'java',
          code: `@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDto> getCourseById(@PathVariable Long id) {
        CourseResponseDto course = courseService.findById(id);
        return ResponseEntity.ok(course);
    }
}`
        }
      },
      {
        heading: 'Agile Sprint Practices & Robust Unit Testing',
        text: 'Working in sprint cycles demonstrated the value of unit testing service logic before integrating database persistence. Writing deterministic mock tests ensured that regressions were caught early during local development.'
      }
    ]
  },
  {
    id: 'flutter-cross-platform-ui-optimization',
    slug: 'flutter-cross-platform-ui-state-optimization',
    title: 'State Management & UI Performance in Cross-Platform Flutter Applications',
    excerpt:
      'Lessons learned debugging rendering pipelines and optimizing widget lifecycles across 10+ mobile screens during the Coreverse internship.',
    date: 'December 2024',
    readTime: '6 min read',
    category: 'Mobile & Flutter',
    tags: ['Flutter', 'Dart', 'Mobile Dev', 'Performance', 'UI/UX'],
    sections: [
      {
        heading: 'Cross-Platform Fidelity: Android vs. iOS',
        text: 'At Coreverse, I delivered 2 mobile applications encompassing 10+ custom UI screens. One of the most frequent challenges in cross-platform development is reconciling subtle platform-specific rendering differences (such as status bar padding, font kerning, and gesture collision).'
      },
      {
        heading: 'Eliminating Unnecessary Widget Re-renders',
        text: 'In Flutter, building expensive widgets within build() methods without const constructors or granular consumer boundaries can drop rendering speeds below 60fps. Extracting sub-widgets and adopting granular state selectors resolved rendering bottlenecks across low-spec test hardware.',
        bullets: [
          'Using const constructors wherever possible to cache element subtrees',
          'Isolating high-frequency state changes to dedicated notifier scopes',
          'Implementing image caching strategies for smooth listview scrolls',
          'Conducting automated QA cycles on both Android and iOS devices'
        ]
      }
    ]
  }
];
