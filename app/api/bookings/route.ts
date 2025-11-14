import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

// Booking validation schema
const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  selected_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  selected_time: z.string().min(1, 'Time is required'),
});

// GET /api/bookings - Get all bookings (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = supabaseAdmin
      .from('bookings')
      .select('*')
      .order('selected_date', { ascending: true })
      .order('selected_time', { ascending: true });

    // Filter by status
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Search by name or email
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ bookings: data });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const { name, email, company, phone, selected_date, selected_time } = validation.data;

    // Validate that the date is in the future
    const bookingDate = new Date(selected_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return NextResponse.json(
        { error: 'Cannot book for a past date' },
        { status: 400 }
      );
    }

    // Create booking in database
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        name,
        email,
        company,
        phone,
        selected_date,
        selected_time,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Trigger N8N webhook for confirmation email
    const n8nWebhook = process.env.N8N_WEBHOOK_NEW_BOOKING;
    if (n8nWebhook) {
      try {
        await fetch(n8nWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            name: booking.name,
            email: booking.email,
            company: booking.company,
            phone: booking.phone,
            selected_date: booking.selected_date,
            selected_time: booking.selected_time,
            cancel_token: booking.cancel_token,
            cancelLink: `${process.env.NEXT_PUBLIC_BASE_URL}/connect/cancel/${booking.cancel_token}`,
            rescheduleLink: `${process.env.NEXT_PUBLIC_BASE_URL}/connect/reschedule/${booking.cancel_token}`,
          }),
        });
      } catch (webhookError) {
        console.error('Failed to trigger N8N webhook:', webhookError);
        // Don't fail the booking if webhook fails
      }
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
