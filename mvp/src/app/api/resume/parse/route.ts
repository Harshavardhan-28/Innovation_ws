import { NextRequest, NextResponse } from 'next/server';
import { parseResume } from '@/lib/resumeParser';
import { updateUser, getUserByEmail } from '@/data/userStore';

/**
 * POST /api/resume/parse
 * Parse a resume and extract skills
 * 
 * 🎓 WORKSHOP NOTE:
 * This uses keyword matching. In production, you could:
 * - Use OpenAI to extract skills with semantic understanding
 * - Use specialized resume parsing APIs (e.g., Affinda, Sovren)
 * - Implement NER (Named Entity Recognition) for better extraction
 */
export async function POST(request: NextRequest) {
  try {
    const { resumeText, userEmail } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { success: false, error: 'Resume text is required' },
        { status: 400 }
      );
    }

    // Parse the resume
    const parsed = parseResume(resumeText);

    // If user email provided, update their profile
    if (userEmail) {
      const updatedUser = updateUser(userEmail, {
        resumeText,
        skills: parsed.skills,
      });

      if (!updatedUser) {
        return NextResponse.json(
          { success: false, error: 'Failed to update user profile' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        skills: parsed.skills,
        wordCount: parsed.wordCount,
        skillCount: parsed.skills.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to parse resume' },
      { status: 500 }
    );
  }
}
