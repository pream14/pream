export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface Profile {
  name: string;
  title: string;
  company: string;
  companyPeriod: string;
  educationSummary: string;
  location: string;
  bio: string;
  resumeUrl: string;
  socialLinks: SocialLinks;
  interests: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export type ProjectCategory = 'Backend' | 'Full Stack' | 'GenAI' | 'Mobile';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  techStack?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  coursework?: string;
  details?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  host: string;
  year: number;
  url?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  publications: Publication[];
  navItems: NavItem[];
}
