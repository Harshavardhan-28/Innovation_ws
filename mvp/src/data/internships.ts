/**
 * =============================================================================
 * InternScout AI MVP - Mock Internship Dataset
 * =============================================================================
 * 
 * This file contains a mock dataset of internship opportunities.
 * 
 * 🎓 WORKSHOP NOTE:
 * In a real system, this data would come from:
 * - A database (Firebase, Supabase, PostgreSQL)
 * - External APIs (LinkedIn, Indeed, company career pages)
 * - Web scrapers (with proper compliance and rate limiting)
 * 
 * For the MVP, we use this static dataset so students can:
 * - See the data structure clearly
 * - Add/edit internships easily
 * - Test the matching logic without external dependencies
 */

import { Internship } from '@/types';

export const mockInternships: Internship[] = [
  {
    id: 'int-001',
    title: 'Frontend Developer Intern',
    company: 'TechStart India',
    location: 'Bangalore',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
    description: 'Join our frontend team to build modern web applications using React and TypeScript. You will work on real customer-facing features and learn from experienced engineers.',
    roleType: 'frontend',
    internshipType: 'summer',
    applicationLink: 'https://techstart.example.com/careers/frontend-intern',
    contactEmail: 'hr@techstart.example.com',
    stipend: '₹25,000/month',
    duration: '3 months',
  },
  {
    id: 'int-002',
    title: 'Backend Engineering Intern',
    company: 'CloudNine Solutions',
    location: 'Remote',
    requiredSkills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Docker'],
    description: 'Work on scalable backend systems serving millions of users. Learn about microservices, cloud infrastructure, and database optimization.',
    roleType: 'backend',
    internshipType: 'summer',
    applicationLink: 'https://cloudnine.example.com/internships',
    contactEmail: 'talent@cloudnine.example.com',
    stipend: '₹30,000/month',
    duration: '3 months',
  },
  {
    id: 'int-003',
    title: 'Data Science Intern',
    company: 'AnalyticsHub',
    location: 'Mumbai',
    requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'SQL', 'Data Visualization'],
    description: 'Apply machine learning to real business problems. Work with large datasets and build predictive models that drive business decisions.',
    roleType: 'data-science',
    internshipType: 'full-time',
    applicationLink: 'https://analyticshub.example.com/careers',
    contactEmail: 'careers@analyticshub.example.com',
    stipend: '₹35,000/month',
    duration: '6 months',
  },
  {
    id: 'int-004',
    title: 'Full Stack Developer Intern',
    company: 'StartupXYZ',
    location: 'Hyderabad',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Git'],
    description: 'Be part of a fast-moving startup team. Work on both frontend and backend, ship features quickly, and see your code in production within days.',
    roleType: 'fullstack',
    internshipType: 'summer',
    applicationLink: 'https://startupxyz.example.com/join',
    contactEmail: 'jobs@startupxyz.example.com',
    stipend: '₹20,000/month',
    duration: '2 months',
  },
  {
    id: 'int-005',
    title: 'Machine Learning Intern',
    company: 'AI Labs India',
    location: 'Bangalore',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
    description: 'Research and implement state-of-the-art ML models. Work on computer vision and NLP projects with mentorship from PhD researchers.',
    roleType: 'ml',
    internshipType: 'full-time',
    applicationLink: 'https://ailabs.example.com/internships',
    contactEmail: 'research@ailabs.example.com',
    stipend: '₹40,000/month',
    duration: '6 months',
  },
  {
    id: 'int-006',
    title: 'DevOps Intern',
    company: 'InfraCloud',
    location: 'Remote',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD'],
    description: 'Learn cloud infrastructure and DevOps practices. Help automate deployments and improve system reliability for enterprise clients.',
    roleType: 'devops',
    internshipType: 'part-time',
    applicationLink: 'https://infracloud.example.com/careers',
    contactEmail: 'hiring@infracloud.example.com',
    stipend: '₹15,000/month',
    duration: '4 months',
  },
  {
    id: 'int-007',
    title: 'Mobile App Developer Intern',
    company: 'AppFactory',
    location: 'Pune',
    requiredSkills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Mobile UI'],
    description: 'Build cross-platform mobile apps used by thousands of users. Learn mobile development best practices and app store deployment.',
    roleType: 'mobile',
    internshipType: 'summer',
    applicationLink: 'https://appfactory.example.com/internships',
    contactEmail: 'hr@appfactory.example.com',
    stipend: '₹22,000/month',
    duration: '3 months',
  },
  {
    id: 'int-008',
    title: 'UI/UX Design Intern',
    company: 'DesignStudio',
    location: 'Delhi',
    requiredSkills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'CSS'],
    description: 'Design beautiful and intuitive user interfaces. Conduct user research and create design systems for web and mobile products.',
    roleType: 'design',
    internshipType: 'part-time',
    applicationLink: 'https://designstudio.example.com/join-us',
    contactEmail: 'design@designstudio.example.com',
    stipend: '₹18,000/month',
    duration: '3 months',
  },
  {
    id: 'int-009',
    title: 'Backend Developer Intern (Python)',
    company: 'DataFlow Systems',
    location: 'Chennai',
    requiredSkills: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'Redis'],
    description: 'Build robust backend services using Python and Django. Work on data pipelines and API development for enterprise clients.',
    roleType: 'backend',
    internshipType: 'summer',
    applicationLink: 'https://dataflow.example.com/careers',
    contactEmail: 'jobs@dataflow.example.com',
    stipend: '₹28,000/month',
    duration: '3 months',
  },
  {
    id: 'int-010',
    title: 'Cloud Engineering Intern',
    company: 'SkyCompute',
    location: 'Remote',
    requiredSkills: ['AWS', 'Azure', 'Terraform', 'Python', 'Linux'],
    description: 'Learn enterprise cloud architecture. Help design and implement cloud solutions for Fortune 500 companies.',
    roleType: 'cloud',
    internshipType: 'full-time',
    applicationLink: 'https://skycompute.example.com/internships',
    contactEmail: 'talent@skycompute.example.com',
    stipend: '₹32,000/month',
    duration: '6 months',
  },
  {
    id: 'int-011',
    title: 'Software Engineer Intern',
    company: 'CodeCraft',
    location: 'Bangalore',
    requiredSkills: ['Java', 'Spring Boot', 'MySQL', 'Git', 'Agile'],
    description: 'Join a team building enterprise software solutions. Learn software engineering best practices and work in an agile environment.',
    roleType: 'backend',
    internshipType: 'summer',
    applicationLink: 'https://codecraft.example.com/careers',
    contactEmail: 'hr@codecraft.example.com',
    stipend: '₹25,000/month',
    duration: '3 months',
  },
  {
    id: 'int-012',
    title: 'AI Research Intern',
    company: 'DeepMind India',
    location: 'Bangalore',
    requiredSkills: ['Python', 'Deep Learning', 'Research', 'PyTorch', 'NLP'],
    description: 'Contribute to cutting-edge AI research. Work on publications and novel ML architectures with world-class researchers.',
    roleType: 'ml',
    internshipType: 'full-time',
    applicationLink: 'https://deepmind.example.com/research-internships',
    contactEmail: 'research@deepmind.example.com',
    stipend: '₹50,000/month',
    duration: '6 months',
  },
  {
    id: 'int-013',
    title: 'Frontend Intern (Vue.js)',
    company: 'WebWizards',
    location: 'Noida',
    requiredSkills: ['Vue.js', 'JavaScript', 'CSS', 'HTML', 'Vuex'],
    description: 'Build modern SPAs using Vue.js. Work on customer-facing dashboards and internal tools.',
    roleType: 'frontend',
    internshipType: 'part-time',
    applicationLink: 'https://webwizards.example.com/jobs',
    contactEmail: 'careers@webwizards.example.com',
    stipend: '₹15,000/month',
    duration: '4 months',
  },
  {
    id: 'int-014',
    title: 'Data Analyst Intern',
    company: 'InsightsPro',
    location: 'Mumbai',
    requiredSkills: ['SQL', 'Excel', 'Python', 'Data Visualization', 'Tableau'],
    description: 'Analyze business data and create actionable insights. Build dashboards and reports for executive leadership.',
    roleType: 'data-science',
    internshipType: 'summer',
    applicationLink: 'https://insightspro.example.com/internships',
    contactEmail: 'hr@insightspro.example.com',
    stipend: '₹20,000/month',
    duration: '2 months',
  },
  {
    id: 'int-015',
    title: 'Cybersecurity Intern',
    company: 'SecureNet',
    location: 'Remote',
    requiredSkills: ['Security', 'Linux', 'Networking', 'Python', 'Penetration Testing'],
    description: 'Learn about enterprise security. Assist with vulnerability assessments and security audits.',
    roleType: 'security',
    internshipType: 'part-time',
    applicationLink: 'https://securenet.example.com/careers',
    contactEmail: 'security@securenet.example.com',
    stipend: '₹18,000/month',
    duration: '4 months',
  },
];

/**
 * Get all internships from the mock dataset
 */
export function getAllInternships(): Internship[] {
  return mockInternships;
}

/**
 * Get a single internship by ID
 */
export function getInternshipById(id: string): Internship | undefined {
  return mockInternships.find(internship => internship.id === id);
}
