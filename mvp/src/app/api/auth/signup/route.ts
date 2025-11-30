import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/data/userStore';

/**
 * POST /api/auth/signup
 * Create a new user account
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password, name, college, degree, graduationYear } = data;

    // Validation
    if (!email || !password || !name || !college || !degree || !graduationYear) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Create the user
    const user = createUser({
      email,
      password,
      name,
      college,
      degree,
      graduationYear: parseInt(graduationYear),
      skills: [],
      resumeText: '',
      preferences: {
        preferredRoles: [],
        preferredLocations: [],
        internshipType: [],
      },
      onboardingComplete: false,
    });

    // Don't send password back to client
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
