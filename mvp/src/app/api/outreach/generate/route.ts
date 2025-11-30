import { NextRequest, NextResponse } from 'next/server';
import { generateOutreachEmail } from '@/lib/outreachGenerator';
import { checkCompliance } from '@/lib/safetyCheck';
import { getUserByEmail, saveOutreachEmail, getOutreachEmailsByUser } from '@/data/userStore';
import { getInternshipById } from '@/data/internships';

/**
 * POST /api/outreach/generate
 * Generate an outreach email for a specific internship
 * 
 * 🎓 WORKSHOP NOTE:
 * This uses template-based generation. In production:
 * - Use GPT-4/Claude to generate personalized emails
 * - Train on successful cold emails for better conversion
 * - A/B test different email styles
 * - Implement tone/formality controls
 */
export async function POST(request: NextRequest) {
  try {
    const { userEmail, internshipId } = await request.json();

    if (!userEmail || !internshipId) {
      return NextResponse.json(
        { success: false, error: 'User email and internship ID are required' },
        { status: 400 }
      );
    }

    // Get user profile
    const user = getUserByEmail(userEmail);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get internship
    const internship = getInternshipById(internshipId);
    if (!internship) {
      return NextResponse.json(
        { success: false, error: 'Internship not found' },
        { status: 404 }
      );
    }

    // Generate the email
    const email = generateOutreachEmail(user, internship);

    // Run safety check
    const safetyResult = checkCompliance(email.body, email.subject);

    if (!safetyResult.passed) {
      return NextResponse.json({
        success: false,
        error: 'Email failed compliance check',
        issues: safetyResult.issues,
      }, { status: 400 });
    }

    // Apply sanitized content and add compliance flag
    const sanitizedEmail = {
      ...email,
      subject: safetyResult.sanitizedSubject || email.subject,
      body: safetyResult.sanitizedBody || email.body,
      complianceChecked: true,
    };

    // Store the email
    saveOutreachEmail(sanitizedEmail);

    return NextResponse.json({
      success: true,
      data: sanitizedEmail,
    });
  } catch (error) {
    console.error('Outreach generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate outreach email' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/outreach/generate
 * Get all generated outreach emails for a user
 */
export async function GET(request: NextRequest) {
  try {
    const userEmail = request.nextUrl.searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'User email is required' },
        { status: 400 }
      );
    }

    // Get user to find their ID
    const user = getUserByEmail(userEmail);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const emails = getOutreachEmailsByUser(user.id);

    return NextResponse.json({
      success: true,
      data: emails,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch outreach emails' },
      { status: 500 }
    );
  }
}
