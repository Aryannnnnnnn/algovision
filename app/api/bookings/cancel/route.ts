import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { z } from 'zod';

const cancelSchema = z.object({
  token: z.string().uuid('Invalid token'),
  cancellation_reason: z.string().optional(),
});

// POST /api/bookings/cancel - Cancel a booking using token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = cancelSchema.safeParse(body);
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

    const { token, cancellation_reason } = validation.data;

    // Find booking by token
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('cancel_token', token)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Check if already cancelled or rescheduled
    if (booking.status === 'cancelled') {
      return NextResponse.json({ error: 'This booking has already been cancelled' }, { status: 400 });
    }

    if (booking.status === 'rescheduled') {
      return NextResponse.json({ error: 'This booking has already been rescheduled' }, { status: 400 });
    }

    // Update booking to cancelled
    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'cancelled',
        cancellation_reason,
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', booking.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Trigger N8N webhook for cancellation email
    const n8nWebhook = process.env.N8N_WEBHOOK_CANCEL_BOOKING;
    if (n8nWebhook) {
      try {
        await fetch(n8nWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            name: booking.name,
            email: booking.email,
            selected_date: booking.selected_date,
            selected_time: booking.selected_time,
            cancellation_reason,
          }),
        });
      } catch (webhookError) {
        console.error('Failed to trigger N8N webhook:', webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking
    });
  } catch (error: any) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
