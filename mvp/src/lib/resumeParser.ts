/**
 * =============================================================================
 * InternScout AI MVP - Resume Parser Module
 * =============================================================================
 * 
 * This module extracts skills and information from resume text.
 * 
 * 🎓 WORKSHOP NOTE:
 * This is a SIMULATED parser using keyword matching. In production, you would:
 * - Use an LLM (GPT-4, Claude) to extract structured data from resumes
 * - Use specialized resume parsing APIs (Affinda, Sovren, etc.)
 * - Implement NLP-based entity extraction
 * - Generate embeddings for semantic matching
 * 
 * The current implementation is intentionally simple so students can:
 * - Understand the concept without AI API complexity
 * - See where AI would plug in later
 * - Run the MVP without external dependencies
 */

// -----------------------------------------------------------------------------
// Skill Keywords Database
// -----------------------------------------------------------------------------

/**
 * A list of common technical skills to detect in resumes.
 * This is the "vocabulary" of our simple parser.
 */
const SKILL_KEYWORDS: string[] = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
  'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R',
  
  // Frontend
  'React', 'Vue.js', 'Angular', 'Next.js', 'HTML', 'CSS', 'Sass', 'Tailwind',
  'Redux', 'jQuery', 'Bootstrap', 'Material UI',
  
  // Backend
  'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'FastAPI',
  'GraphQL', 'REST APIs', 'Microservices',
  
  // Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Firebase',
  'SQL', 'NoSQL', 'DynamoDB',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins',
  'Terraform', 'Linux', 'Git', 'GitHub Actions',
  
  // Data Science & ML
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas',
  'NumPy', 'Scikit-learn', 'Data Visualization', 'NLP', 'Computer Vision',
  'Data Science', 'Statistics', 'Tableau', 'Power BI',
  
  // Mobile
  'React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI',
  
  // Other
  'Agile', 'Scrum', 'Figma', 'UI Design', 'UX Research', 'Prototyping',
  'Security', 'Networking', 'Penetration Testing', 'Research',
];

// -----------------------------------------------------------------------------
// Parser Functions
// -----------------------------------------------------------------------------

export interface ParsedResume {
  skills: string[];
  rawText: string;
  wordCount: number;
}

/**
 * Parse resume text and extract skills using keyword matching.
 * 
 * 🎓 WORKSHOP NOTE:
 * This function would be replaced with an LLM call in production:
 * 
 * async function parseResumeWithAI(text: string): Promise<ParsedResume> {
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [{
 *       role: "system",
 *       content: "Extract skills, experience, and education from this resume..."
 *     }, {
 *       role: "user", 
 *       content: text
 *     }]
 *   });
 *   return JSON.parse(response.choices[0].message.content);
 * }
 */
export function parseResume(resumeText: string): ParsedResume {
  const text = resumeText.toLowerCase();
  const detectedSkills: string[] = [];
  
  // Simple keyword matching - check if each skill appears in the text
  for (const skill of SKILL_KEYWORDS) {
    // Use word boundary matching to avoid partial matches
    // e.g., "Java" shouldn't match "JavaScript"
    const pattern = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (pattern.test(text)) {
      detectedSkills.push(skill);
    }
  }
  
  // Special case: "JS" often means JavaScript
  if (/\bjs\b/i.test(text) && !detectedSkills.includes('JavaScript')) {
    detectedSkills.push('JavaScript');
  }
  
  // Special case: "TS" often means TypeScript
  if (/\bts\b/i.test(text) && !detectedSkills.includes('TypeScript')) {
    detectedSkills.push('TypeScript');
  }
  
  return {
    skills: detectedSkills,
    rawText: resumeText,
    wordCount: resumeText.split(/\s+/).filter(w => w.length > 0).length,
  };
}

/**
 * Get a list of all known skills (for UI dropdowns, etc.)
 */
export function getAllKnownSkills(): string[] {
  return [...SKILL_KEYWORDS].sort();
}
