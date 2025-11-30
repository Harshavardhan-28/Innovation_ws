/**
 * =============================================================================
 * InternScout AI MVP - In-Memory User Store
 * =============================================================================
 * 
 * This module provides a simple in-memory storage for user data.
 * 
 * 🎓 WORKSHOP NOTE:
 * This is a mock database for the MVP. In production, you would use:
 * - Firebase Firestore or Realtime Database
 * - Supabase (PostgreSQL)
 * - MongoDB
 * - Any other production database
 * 
 * The interface is designed to be easily replaceable - just swap out the
 * implementation while keeping the same function signatures.
 */

import { StudentProfile, OutreachEmail } from '@/types';

// -----------------------------------------------------------------------------
// In-Memory Storage
// -----------------------------------------------------------------------------

// Simple in-memory maps to store data (resets on server restart)
const users: Map<string, StudentProfile> = new Map();
const outreachEmails: Map<string, OutreachEmail[]> = new Map();

// Pre-populate with a demo user for testing
const demoUser: StudentProfile = {
  id: 'demo-user-001',
  email: 'demo@student.edu',
  password: 'demo123', // In production, NEVER store plain text passwords!
  name: 'Demo Student',
  college: 'IIT Delhi',
  degree: 'B.Tech Computer Science',
  graduationYear: 2025,
  skills: ['JavaScript', 'React', 'Python', 'Node.js'],
  resumeText: '',
  preferences: {
    preferredRoles: ['frontend', 'fullstack'],
    preferredLocations: ['remote', 'bangalore'],
    internshipType: ['summer'],
  },
  onboardingComplete: true,
  createdAt: new Date().toISOString(),
};

users.set(demoUser.email, demoUser);

// -----------------------------------------------------------------------------
// User Operations
// -----------------------------------------------------------------------------

/**
 * Create a new user account
 */
export function createUser(userData: Omit<StudentProfile, 'id' | 'createdAt'>): StudentProfile {
  const user: StudentProfile = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  users.set(user.email, user);
  return user;
}

/**
 * Find user by email
 */
export function getUserByEmail(email: string): StudentProfile | undefined {
  return users.get(email);
}

/**
 * Find user by ID
 */
export function getUserById(id: string): StudentProfile | undefined {
  for (const user of users.values()) {
    if (user.id === id) return user;
  }
  return undefined;
}

/**
 * Update user profile
 */
export function updateUser(email: string, updates: Partial<StudentProfile>): StudentProfile | undefined {
  const user = users.get(email);
  if (!user) return undefined;
  
  const updatedUser = { ...user, ...updates };
  users.set(email, updatedUser);
  return updatedUser;
}

/**
 * Validate user credentials (mock authentication)
 * 
 * 🎓 WORKSHOP NOTE:
 * In production, you would:
 * - Hash passwords with bcrypt or similar
 * - Use Firebase Auth, Auth0, or NextAuth.js
 * - Implement proper session management with JWTs
 */
export function validateCredentials(email: string, password: string): StudentProfile | null {
  const user = users.get(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

// -----------------------------------------------------------------------------
// Outreach Email Operations
// -----------------------------------------------------------------------------

/**
 * Save an outreach email draft
 */
export function saveOutreachEmail(email: OutreachEmail): void {
  const userEmails = outreachEmails.get(email.studentId) || [];
  
  // Check if we already have a draft for this internship
  const existingIndex = userEmails.findIndex(e => e.internshipId === email.internshipId);
  if (existingIndex >= 0) {
    userEmails[existingIndex] = email;
  } else {
    userEmails.push(email);
  }
  
  outreachEmails.set(email.studentId, userEmails);
}

/**
 * Get all outreach emails for a user
 */
export function getOutreachEmailsByUser(userId: string): OutreachEmail[] {
  return outreachEmails.get(userId) || [];
}

/**
 * Get outreach email for a specific internship
 */
export function getOutreachEmail(userId: string, internshipId: string): OutreachEmail | undefined {
  const userEmails = outreachEmails.get(userId) || [];
  return userEmails.find(e => e.internshipId === internshipId);
}

/**
 * Update outreach email status
 */
export function updateOutreachStatus(
  userId: string, 
  internshipId: string, 
  status: OutreachEmail['status']
): OutreachEmail | undefined {
  const userEmails = outreachEmails.get(userId) || [];
  const email = userEmails.find(e => e.internshipId === internshipId);
  
  if (email) {
    email.status = status;
    if (status === 'sent') {
      email.sentAt = new Date().toISOString();
    }
  }
  
  return email;
}
