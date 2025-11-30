/**
 * =============================================================================
 * InternScout AI MVP - Type Definitions
 * =============================================================================
 * 
 * This file defines all the TypeScript interfaces used across the MVP.
 * These types model students, internships, outreach emails, and matching results.
 * 
 * In a production system, these would likely be generated from a database schema
 * or API specification.
 */

// -----------------------------------------------------------------------------
// Student Profile Types
// -----------------------------------------------------------------------------

export interface StudentProfile {
  id: string;
  email: string;
  password: string; // In production, this would be hashed and stored securely
  name: string;
  college: string;
  degree: string;
  graduationYear: number;
  
  // Extracted from resume
  skills: string[];
  resumeText: string;
  
  // Student preferences
  preferences: StudentPreferences;
  
  // Track onboarding completion
  onboardingComplete: boolean;
  createdAt: string;
}

export interface StudentPreferences {
  preferredRoles: string[];      // e.g., ["frontend", "backend", "data-science"]
  preferredLocations: string[];  // e.g., ["remote", "bangalore", "mumbai"]
  internshipType: string[];      // e.g., ["summer", "part-time", "full-time"]
}

// -----------------------------------------------------------------------------
// Internship Types
// -----------------------------------------------------------------------------

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
  description: string;
  roleType: string;           // e.g., "frontend", "backend", "data-science"
  internshipType: string;     // e.g., "summer", "part-time", "full-time"
  applicationLink: string;
  contactEmail: string;
  stipend?: string;
  duration?: string;
}

// -----------------------------------------------------------------------------
// Matching Types
// -----------------------------------------------------------------------------

export interface MatchResult {
  internship: Internship;
  score: number;              // 0-100 match score
  matchReasons: string[];     // Why this internship matches
}

// -----------------------------------------------------------------------------
// Outreach Types
// -----------------------------------------------------------------------------

export type OutreachStatus = 'not-started' | 'draft-generated' | 'sent';

export interface OutreachEmail {
  id: string;
  internshipId: string;
  studentId: string;
  subject: string;
  body: string;
  status: OutreachStatus;
  createdAt: string;
  sentAt?: string;
  complianceChecked: boolean;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// -----------------------------------------------------------------------------
// Auth Types
// -----------------------------------------------------------------------------

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  college: string;
  degree: string;
  graduationYear: number;
}
