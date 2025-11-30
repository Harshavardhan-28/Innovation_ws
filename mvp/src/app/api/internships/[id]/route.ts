import { NextRequest, NextResponse } from 'next/server';
import { getInternshipById } from '@/data/internships';

/**
 * GET /api/internships/[id]
 * Get a specific internship by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const internship = getInternshipById(id);

    if (!internship) {
      return NextResponse.json(
        { success: false, error: 'Internship not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: internship,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch internship' },
      { status: 500 }
    );
  }
}
