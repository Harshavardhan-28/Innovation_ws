import { NextRequest, NextResponse } from 'next/server';
import { findMatches } from '@/lib/matchingEngine';
import { getUserByEmail } from '@/data/userStore';
import { getAllInternships } from '@/data/internships';

/**
 * POST /api/match
 * Find matching internships for a student
 * 
 * 🎓 WORKSHOP NOTE:
 * This uses a simple weighted scoring system. In production:
 * - Use vector embeddings (OpenAI, Cohere) for semantic matching
 * - Implement collaborative filtering based on similar students
 * - Use ML models trained on successful placements
 * - Consider recency, company reputation, and other factors
 */
export async function POST(request: NextRequest) {
  try {
    const { userEmail, limit = 10 } = await request.json();

    // Get user profile
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'User email is required' },
        { status: 400 }
      );
    }

    const user = getUserByEmail(userEmail);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.skills || user.skills.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No skills found. Please upload your resume first.' },
        { status: 400 }
      );
    }

    // Find matches using the user's profile
    const matches = findMatches(user, limit);

    return NextResponse.json({
      success: true,
      data: {
        matches,
        totalMatches: matches.length,
        returned: matches.length,
      },
    });
  } catch (error) {
    console.error('Matching error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to find matches' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/match
 * Get all available internships (for browsing)
 */
export async function GET() {
  try {
    const internships = getAllInternships();
    return NextResponse.json({
      success: true,
      data: {
        internships,
        total: internships.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch internships' },
      { status: 500 }
    );
  }
}
