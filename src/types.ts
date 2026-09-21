export type PageId = 'home' | 'projects' | 'resume' | 'blog' | 'contact';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  category: 'Full Stack' | 'Agentic AI' | 'Mobile' | 'Systems' | 'UI/UX';
  featured: boolean;
  description: string;
  problemSolved: string;
  features: string[];
  techStack: string[];
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationNote?: string;
  image: string;
  category: string;
  summary: string;
  verifiedSigner?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade: string;
  gradeLabel: string;
  details?: string;
}

export type SkillLevel = 'Strong' | 'Working Knowledge' | 'Intermediate' | 'Familiar';

export interface SkillItem {
  name: string;
  level: SkillLevel;
  highlight?: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Agentic AI' | 'Full Stack' | 'Java / Spring' | 'Mobile & Flutter' | 'Database Architecture';
  tags: string[];
  sections: {
    heading: string;
    text: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
    bullets?: string[];
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
