import { NextRequest, NextResponse } from 'next/server';
import { updateOutreachStatus, getOutreachEmails } from '@/data/userStore';

/**
 * POST /api/outreach/status
 * Update the status of an outreach email
 */
export async function POST(request: NextRequest) {
  try {
    const { userEmail, emailId, status } = await request.json();

    if (!userEmail || !emailId || !status) {
      return NextResponse.json(
        { success: false, error: 'User email, email ID, and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['draft', 'sent', 'replied', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Status must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = updateOutreachStatus(userEmail, emailId, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
