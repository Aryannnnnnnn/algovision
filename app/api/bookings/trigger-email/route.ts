import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const triggerEmailSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
  recipientEmail: z.string().email('Invalid email'),
  recipientName: z.string().min(1, 'Name is required'),
  emailType: z.enum(['custom', 'reminder', 'reschedule_request', 'confirmation']),
  aiInstructions: z.string().optional(),
  bookingDate: z.string().optional(),
  bookingTime: z.string().optional(),
});

// POST /api/bookings/trigger-email - Trigger N8N to send email with AI
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validation = triggerEmailSchema.safeParse(body);
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

    const data = validation.data;

    // Trigger N8N webhook for custom email with AI
    const n8nWebhook = process.env.N8N_WEBHOOK_SEND_EMAIL;
    if (!n8nWebhook) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const response = await fetch(n8nWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        sentBy: user.emailAddresses[0]?.emailAddress || 'admin',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger email workflow');
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error: any) {
    console.error('Error triggering email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
