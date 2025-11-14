import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { z } from 'zod';

const rescheduleSchema = z.object({
  token: z.string().uuid('Invalid token'),
  selected_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  selected_time: z.string().min(1, 'Time is required'),
});

// POST /api/bookings/reschedule - Reschedule a booking using token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = rescheduleSchema.safeParse(body);
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

    const { token, selected_date, selected_time } = validation.data;

    // Validate that the new date is in the future
    const newDate = new Date(selected_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newDate < today) {
      return NextResponse.json(
        { error: 'Cannot reschedule to a past date' },
        { status: 400 }
      );
    }

    // Find original booking by token
    const { data: originalBooking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('cancel_token', token)
      .single();

    if (fetchError || !originalBooking) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Check if already cancelled or rescheduled
    if (originalBooking.status === 'cancelled') {
      return NextResponse.json({ error: 'This booking has already been cancelled' }, { status: 400 });
    }

    if (originalBooking.status === 'rescheduled') {
      return NextResponse.json({ error: 'This booking has already been rescheduled' }, { status: 400 });
    }

    // Mark original booking as rescheduled
    await supabaseAdmin
      .from('bookings')
      .update({
        status: 'rescheduled',
        rescheduled_at: new Date().toISOString(),
      })
      .eq('id', originalBooking.id);

    // Create new booking
    const { data: newBooking, error: createError } = await supabaseAdmin
      .from('bookings')
      .insert({
        name: originalBooking.name,
        email: originalBooking.email,
        company: originalBooking.company,
        phone: originalBooking.phone,
        selected_date,
        selected_time,
        status: 'pending',
        original_booking_id: originalBooking.id,
      })
      .select()
      .single();

    if (createError) throw createError;

    // Trigger N8N webhook for reschedule confirmation email
    const n8nWebhook = process.env.N8N_WEBHOOK_RESCHEDULE_BOOKING;
    if (n8nWebhook) {
      try {
        await fetch(n8nWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: newBooking.id,
            name: newBooking.name,
            email: newBooking.email,
            company: newBooking.company,
            phone: newBooking.phone,
            old_date: originalBooking.selected_date,
            old_time: originalBooking.selected_time,
            new_date: newBooking.selected_date,
            new_time: newBooking.selected_time,
            cancel_token: newBooking.cancel_token,
            cancelLink: `${process.env.NEXT_PUBLIC_BASE_URL}/connect/cancel/${newBooking.cancel_token}`,
            rescheduleLink: `${process.env.NEXT_PUBLIC_BASE_URL}/connect/reschedule/${newBooking.cancel_token}`,
          }),
        });
      } catch (webhookError) {
        console.error('Failed to trigger N8N webhook:', webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Booking rescheduled successfully',
      booking: newBooking
    });
  } catch (error: any) {
    console.error('Error rescheduling booking:', error);
    return NextResponse.json({ error: 'Failed to reschedule booking' }, { status: 500 });
  }
}
