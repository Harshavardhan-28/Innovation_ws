/**
 * =============================================================================
 * InternScout AI MVP - Outreach Email Generator Module
 * =============================================================================
 * 
 * This module generates personalized outreach emails for internship applications.
 * 
 * 🎓 WORKSHOP NOTE:
 * This is a TEMPLATE-BASED generator. In production, you would use an LLM:
 * 
 * async function generateEmailWithAI(
 *   student: StudentProfile,
 *   internship: Internship
 * ): Promise<string> {
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [{
 *       role: "system",
 *       content: `You are a professional email writer helping students apply 
 *         for internships. Write personalized, concise, and professional emails.
 *         Avoid generic phrases. Highlight specific skills that match the role.`
 *     }, {
 *       role: "user",
 *       content: `Write an outreach email for:
 *         Student: ${student.name}, skills: ${student.skills.join(', ')}
 *         Internship: ${internship.title} at ${internship.company}
 *         Requirements: ${internship.requiredSkills.join(', ')}`
 *     }]
 *   });
 *   return response.choices[0].message.content;
 * }
 * 
 * The template-based approach is used here so students can:
 * - See the structure of a good outreach email
 * - Run the MVP without API costs
 * - Understand where AI would add value
 */

import { StudentProfile, Internship, OutreachEmail } from '@/types';

// -----------------------------------------------------------------------------
// Email Templates
// -----------------------------------------------------------------------------

/**
 * Generate a personalized subject line
 */
function generateSubject(student: StudentProfile, internship: Internship): string {
  return `Application for ${internship.title} - ${student.name} (${student.college})`;
}

/**
 * Generate the email body using a template
 */
function generateBody(student: StudentProfile, internship: Internship): string {
  // Find matching skills between student and job requirements
  const studentSkillsLower = student.skills.map(s => s.toLowerCase());
  const matchingSkills = internship.requiredSkills.filter(skill =>
    studentSkillsLower.includes(skill.toLowerCase())
  );
  
  // Pick top 3 matching skills, or top student skills if no match
  const highlightedSkills = matchingSkills.length > 0
    ? matchingSkills.slice(0, 3)
    : student.skills.slice(0, 3);
  
  const skillsPhrase = highlightedSkills.length > 0
    ? highlightedSkills.join(', ')
    : 'relevant technical skills';
  
  const body = `Dear Hiring Team,

I am writing to express my strong interest in the ${internship.title} position at ${internship.company}. As a ${student.degree} student at ${student.college} (graduating ${student.graduationYear}), I am eager to contribute to your team and grow as a professional.

My technical background includes ${skillsPhrase}, which I believe align well with the requirements for this role. I am particularly excited about this opportunity because ${internship.company} is known for innovative work in this space.

I would welcome the opportunity to discuss how my skills and enthusiasm could benefit your team. I am available for an interview at your earliest convenience.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
${student.name}
${student.email}
${student.college}`;

  return body;
}

// -----------------------------------------------------------------------------
// Public Functions
// -----------------------------------------------------------------------------

/**
 * Generate an outreach email for a specific internship
 */
export function generateOutreachEmail(
  student: StudentProfile,
  internship: Internship
): Omit<OutreachEmail, 'complianceChecked'> {
  return {
    id: `email-${Date.now()}`,
    internshipId: internship.id,
    studentId: student.id,
    subject: generateSubject(student, internship),
    body: generateBody(student, internship),
    status: 'draft-generated',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Get a preview of what the email would look like
 * (without saving it to the store)
 */
export function previewOutreachEmail(
  student: StudentProfile,
  internship: Internship
): { subject: string; body: string } {
  return {
    subject: generateSubject(student, internship),
    body: generateBody(student, internship),
  };
}
