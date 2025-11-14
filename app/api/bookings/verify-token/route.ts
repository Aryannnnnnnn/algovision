import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET /api/bookings/verify-token?token=xxx - Verify cancel token and get booking
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('cancel_token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Check if booking is already cancelled or rescheduled
    if (data.status === 'cancelled') {
      return NextResponse.json({ error: 'This booking has already been cancelled' }, { status: 400 });
    }

    if (data.status === 'rescheduled') {
      return NextResponse.json({ error: 'This booking has already been rescheduled' }, { status: 400 });
    }

    // Check if booking date has passed
    const bookingDate = new Date(data.selected_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return NextResponse.json({ error: 'This booking has already passed' }, { status: 400 });
    }

    return NextResponse.json({ booking: data });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
  }
}
