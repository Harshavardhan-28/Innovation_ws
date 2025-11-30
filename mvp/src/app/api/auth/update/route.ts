import { NextRequest, NextResponse } from 'next/server';
import { updateUser, getUserByEmail } from '@/data/userStore';

/**
 * POST /api/auth/update
 * Update user profile
 */
export async function POST(request: NextRequest) {
  try {
    const { email, updates } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const updatedUser = updateUser(email, updates);

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Don't send password back to client
    const { password: _, ...safeUser } = updatedUser;

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
