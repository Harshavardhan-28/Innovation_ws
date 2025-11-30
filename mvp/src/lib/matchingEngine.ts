/**
 * =============================================================================
 * InternScout AI MVP - Matching Engine Module
 * =============================================================================
 * 
 * This module matches students with internship opportunities.
 * 
 * 🎓 WORKSHOP NOTE:
 * This is a SIMULATED matching engine using simple scoring. In production:
 * 
 * 1. Generate embeddings for both student profiles and job descriptions:
 *    const studentEmbedding = await openai.embeddings.create({
 *      model: "text-embedding-ada-002",
 *      input: studentProfileText
 *    });
 * 
 * 2. Store embeddings in a vector database (Pinecone, Weaviate, Qdrant)
 * 
 * 3. Use cosine similarity or ANN search for matching:
 *    const matches = await vectorDB.query({
 *      vector: studentEmbedding,
 *      topK: 10,
 *      filter: { location: studentPreferences.locations }
 *    });
 * 
 * The current implementation uses a weighted scoring system that:
 * - Calculates skill overlap between student and job requirements
 * - Boosts scores for matching preferences (role, location, type)
 * - Returns sorted results with explanations
 */

import { StudentProfile, Internship, MatchResult } from '@/types';
import { getAllInternships } from '@/data/internships';

// -----------------------------------------------------------------------------
// Scoring Weights
// -----------------------------------------------------------------------------

const WEIGHTS = {
  skillMatch: 50,      // Base weight for skill overlap (max 50 points)
  roleMatch: 20,       // Bonus for matching role type
  locationMatch: 15,   // Bonus for matching location
  typeMatch: 15,       // Bonus for matching internship type
};

// -----------------------------------------------------------------------------
// Matching Functions
// -----------------------------------------------------------------------------

/**
 * Calculate match score between a student and an internship.
 * Returns a score from 0-100 with reasons for the match.
 * 
 * 🎓 WORKSHOP NOTE:
 * This function simulates what a vector similarity search would do.
 * In production, you would replace this with:
 * 
 * async function calculateSemanticMatch(
 *   studentEmbedding: number[],
 *   internshipEmbedding: number[]
 * ): Promise<number> {
 *   return cosineSimilarity(studentEmbedding, internshipEmbedding);
 * }
 */
function calculateMatchScore(
  student: StudentProfile,
  internship: Internship
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  
  // -----------------------------------------------------
  // 1. Skill Match (up to 50 points)
  // -----------------------------------------------------
  const studentSkillsLower = student.skills.map(s => s.toLowerCase());
  const requiredSkillsLower = internship.requiredSkills.map(s => s.toLowerCase());
  
  const matchingSkills = studentSkillsLower.filter(skill => 
    requiredSkillsLower.includes(skill)
  );
  
  const skillOverlapRatio = requiredSkillsLower.length > 0
    ? matchingSkills.length / requiredSkillsLower.length
    : 0;
  
  const skillScore = Math.round(skillOverlapRatio * WEIGHTS.skillMatch);
  score += skillScore;
  
  if (matchingSkills.length > 0) {
    // Find original casing for display
    const displaySkills = student.skills.filter(s => 
      matchingSkills.includes(s.toLowerCase())
    );
    reasons.push(`${matchingSkills.length} matching skills: ${displaySkills.slice(0, 3).join(', ')}${displaySkills.length > 3 ? '...' : ''}`);
  }
  
  // -----------------------------------------------------
  // 2. Role Match (up to 20 points)
  // -----------------------------------------------------
  const preferredRoles = student.preferences.preferredRoles.map(r => r.toLowerCase());
  if (preferredRoles.includes(internship.roleType.toLowerCase())) {
    score += WEIGHTS.roleMatch;
    reasons.push(`Matches your preferred role: ${internship.roleType}`);
  }
  
  // Partial match for related roles (e.g., fullstack matches both frontend and backend)
  if (internship.roleType === 'fullstack') {
    if (preferredRoles.includes('frontend') || preferredRoles.includes('backend')) {
      score += Math.round(WEIGHTS.roleMatch * 0.5);
      reasons.push('Fullstack role includes your preferred area');
    }
  }
  
  // -----------------------------------------------------
  // 3. Location Match (up to 15 points)
  // -----------------------------------------------------
  const preferredLocations = student.preferences.preferredLocations.map(l => l.toLowerCase());
  const internshipLocation = internship.location.toLowerCase();
  
  if (preferredLocations.includes(internshipLocation)) {
    score += WEIGHTS.locationMatch;
    reasons.push(`Location match: ${internship.location}`);
  } else if (preferredLocations.includes('remote') && internshipLocation === 'remote') {
    score += WEIGHTS.locationMatch;
    reasons.push('Remote position matches your preference');
  } else if (internshipLocation === 'remote') {
    // Remote is always somewhat desirable
    score += Math.round(WEIGHTS.locationMatch * 0.5);
    reasons.push('Remote option available');
  }
  
  // -----------------------------------------------------
  // 4. Internship Type Match (up to 15 points)
  // -----------------------------------------------------
  const preferredTypes = student.preferences.internshipType.map(t => t.toLowerCase());
  if (preferredTypes.includes(internship.internshipType.toLowerCase())) {
    score += WEIGHTS.typeMatch;
    reasons.push(`${internship.internshipType} internship matches your preference`);
  }
  
  // Ensure score doesn't exceed 100
  score = Math.min(score, 100);
  
  return { score, reasons };
}

/**
 * Find the best internship matches for a student.
 * Returns sorted results with scores and explanations.
 */
export function findMatches(
  student: StudentProfile,
  limit: number = 10
): MatchResult[] {
  const internships = getAllInternships();
  
  // Calculate scores for all internships
  const results: MatchResult[] = internships.map(internship => {
    const { score, reasons } = calculateMatchScore(student, internship);
    return {
      internship,
      score,
      matchReasons: reasons,
    };
  });
  
  // Sort by score (descending) and return top results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get match details for a specific internship
 */
export function getMatchDetails(
  student: StudentProfile,
  internshipId: string
): MatchResult | null {
  const internships = getAllInternships();
  const internship = internships.find(i => i.id === internshipId);
  
  if (!internship) return null;
  
  const { score, reasons } = calculateMatchScore(student, internship);
  return {
    internship,
    score,
    matchReasons: reasons,
  };
}
