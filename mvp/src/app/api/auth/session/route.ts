import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/data/userStore';

/**
 * GET /api/auth/session
 * Check if user has an active session
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ user: null });
    }

    const user = getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    // Don't send password back to client
    const { password: _, ...safeUser } = user;

    return NextResponse.json({ user: safeUser });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
