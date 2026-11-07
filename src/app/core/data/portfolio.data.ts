import { PortfolioData } from '../models/portfolio.model';

/**
 * Formspree Endpoint Configuration
 * TODO: Replace with your actual Formspree endpoint URL (e.g. 'https://formspree.io/f/xyzab123')
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Pream',
    title: 'Digital Specialist Engineer',
    company: 'Infosys',
    companyPeriod: 'Since May 2026',
    educationSummary: 'BE Computer Science & Engineering, PSG College of Technology (2022-2026)',
    location: 'India',
    bio: 'Digital Specialist Engineer at Infosys and PSG Tech graduate. I engineer resilient Spring Boot microservices, scalable full-stack applications, and local LLM pipelines with a relentless focus on performance and reliability.',
    resumeUrl: 'Pream_Infy_resume_1.pdf', // TODO: copy the PDF into public/ with this exact name
    socialLinks: {
      github: 'https://github.com/pream14', // TODO
      linkedin: 'https://www.linkedin.com/in/pream-s', // TODO
      email: 'mailto:pream20041214@gmail.com'
    },
    interests: [
      'Backend Development',
      'Full Stack Development',
      'Generative AI'
    ]
  },

  skills: [
    {
      category: 'Languages',
      description: 'Languages I use for application development and problem solving.',
      skills: ['Java', 'Python', 'TypeScript', 'SQL', 'C']
    },
    {
      category: 'AI & ML',
      description: 'Working with LLMs and retrieval-based pipelines.',
      skills: ['Generative AI', 'LLMs', 'RAG', 'FAISS', 'Gemini API']
    },
    {
      category: 'Web & APIs',
      description: 'Building server-side applications, APIs and distributed services.',
      skills: ['Spring Boot', 'Spring Cloud Gateway', 'Flask', 'REST APIs', 'Microservices']
    },
    {
      category: 'Databases',
      description: 'Relational and document data storage systems.',
      skills: ['MySQL', 'MongoDB', 'SQLite']
    },
    {
      category: 'Frontend & Mobile',
      description: 'Web and cross-platform mobile interfaces.',
      skills: ['Angular', 'React Native', 'HTML', 'CSS']
    },
    {
      category: 'Engineering & Tools',
      description: 'Tooling, service discovery and core computer science fundamentals.',
      skills: ['Git', 'GitHub', 'Consul', 'Postman', 'OOP', 'DSA']
    }
  ],

  projects: [
    {
      id: 'infy-learnx',
      title: 'Infy LearnX',
      description: 'A full-stack microservices learning platform with an Angular frontend and five Spring Boot services: courses, trainees, assessments, registrations and summary. Uses Spring Cloud Gateway for centralized API routing and Consul for service discovery. Built as my Infosys training project.',
      tags: ['Angular', 'Spring Boot', 'Spring Cloud Gateway', 'Consul'],
      category: 'Full Stack',
      // repoUrl: 'https://github.com/YOUR_GITHUB_USERNAME/REPO', // TODO
      featured: true
    },
    {
      id: 'llm-cli-agent',
      title: 'LLM-Powered CLI Agent',
      description: 'A local, offline CLI agent that converts natural language queries into Bash commands, with a RAG pipeline (FAISS, all-MiniLM-L6-v2) to reduce hallucinations. Benchmarked Mistral 7B, Code Llama 7B, Llama 2, Qwen 2.5 and Gemma 2, with Mistral 7B reaching the highest accuracy at 70.7%. Includes a safety filter and a confirmation step to block harmful commands.',
      tags: ['Python', 'FAISS', 'RAG', 'LLMs'],
      category: 'GenAI',
      // repoUrl: 'https://github.com/YOUR_GITHUB_USERNAME/REPO', // TODO
      featured: true
    },
    {
      id: 'civil-financial-tracker',
      title: 'Civil Construction Financial Tracking System',
      description: 'A React Native app with a Flask and MySQL backend to manage project-wise expenses and payments, plus a machine learning model that predicts future expenses from historical data. Published at IEEE ICNGCS 2025.',
      tags: ['React Native', 'Flask', 'MySQL', 'Machine Learning'],
      category: 'Mobile',
      // repoUrl: 'https://github.com/YOUR_GITHUB_USERNAME/REPO', // TODO
      featured: true
    },
    {
      id: 'drip-advisor',
      title: 'Drip Advisor',
      description: 'An AI outfit recommendation app built with React Native and the multimodal Gemini API. Recommends outfits from wardrobe images, weather, calendar events and user preferences.',
      tags: ['React Native', 'Gemini API'],
      category: 'GenAI',
      // repoUrl: 'https://github.com/YOUR_GITHUB_USERNAME/REPO', // TODO
      featured: false
    },
    {
      id: 'echo-trails',
      title: 'Echo Trails',
      description: 'A location-based voice notes app for recording and sharing voice notes at GPS locations, with time-based visibility, proximity alerts and customizable discovery ranges.',
      tags: ['React Native', 'FastAPI', 'MongoDB'],
      category: 'Mobile',
      // repoUrl: 'https://github.com/YOUR_GITHUB_USERNAME/REPO', // TODO
      featured: false
    }
  ],

  experience: [
    {
      id: 'infosys-dse',
      role: 'Digital Specialist Engineer (DSE)',
      company: 'Infosys',
      period: 'May 2026 - Present',
      location: 'India',
      description: 'Completed training in Java, Spring Boot and Angular, then built Infy LearnX, a full-stack microservices learning platform, as the training project.',
      highlights: [
        'Completed training in Java, Spring Boot and Angular',
        'Built Infy LearnX, a full-stack microservices learning platform, as the training project',
        'Cleared the Java-based Karat technical interview, the screening step for allocation to Citi client projects'
      ],
      techStack: ['Java', 'Spring Boot', 'Angular', 'Microservices']
    },
    {
      id: 'lysa-ai-intern',
      role: 'AI Systems Intern',
      company: 'Lysa Solutions',
      period: 'May 2025 - June 2025',
      location: 'Coimbatore',
      description: 'Worked on an AI-powered system, improving its frontend and extending its backend database.',
      highlights: [
        'Enhanced the frontend UI of an AI-powered system',
        'Modified backend database schemas to support new features while keeping existing components consistent'
      ]
    }
  ],

  education: [
    {
      id: 'psg-tech-be',
      degree: 'Bachelor of Engineering in Computer Science and Engineering',
      institution: 'PSG College of Technology',
      period: '2022 - 2026',
      location: 'Coimbatore, Tamil Nadu',
      details: 'CGPA: 7.98'
    }
  ],

  publications: [
    {
      id: 'pub-cli-agent',
      title: 'LLM-Powered CLI Interface Agent: A Comparative Analysis',
      venue: 'IEEE ICISCoIS 2026',
      host: 'PSG College of Technology',
      year: 2026
    },
    {
      id: 'pub-financial-tracking',
      title: 'Financial Tracking System for Civil Construction Projects',
      venue: 'IEEE ICNGCS 2025',
      host: 'PSG Institute of Technology and Applied Research',
      year: 2025
    }
  ],

  navItems: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ]
};
