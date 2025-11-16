import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Booking validation schema
const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company name is required').max(100),
  phone: z.string().max(20).optional(),
  selected_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  selected_time: z.string().min(1, 'Time is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  guestEmails: z.array(z.string().email()).optional(),
  meetingPlatform: z.string().min(1, 'Meeting platform is required'),
  website: z.string().optional(),
  businessDescription: z.string().min(1, 'Business description is required'),
  location: z.string().min(1, 'Location is required'),
});

// POST /api/cal-booking - Create a booking via Cal.com API
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

    const { name, email, company, phone, selected_date, selected_time, timezone, guestEmails, meetingPlatform, website, businessDescription, location } = validation.data;

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

    // Combine date and time for Cal.com
    // Create the datetime string in the user's timezone
    const timeIn24Hr = convertTo24Hour(selected_time);
    const dateTimeString = `${selected_date}T${timeIn24Hr}`;

    // Parse as UTC to avoid timezone conversion issues
    const startTime = new Date(dateTimeString);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutes duration

    // Create booking via Cal.com API
    const calApiKey = process.env.CAL_API_KEY;
    if (!calApiKey) {
      return NextResponse.json({ error: 'Cal.com API key not configured' }, { status: 500 });
    }

    // Prepare metadata and notes
    const metadata = {
      company,
      phone: phone || 'Not provided',
      website: website || 'Not provided',
      meetingPlatform,
      businessDescription,
      location,
    };

    const notes = `
Company: ${company}
Phone: ${phone || 'Not provided'}
Website: ${website || 'Not provided'}
Location: ${location}
Preferred Platform: ${meetingPlatform}
Business Description: ${businessDescription}
    `.trim();

    const calResponse = await fetch(`https://api.cal.com/v1/bookings?apiKey=${calApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTypeId: parseInt(process.env.CAL_EVENT_TYPE_ID || '0'),
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        responses: {
          name,
          email,
          guests: guestEmails?.filter(e => e.length > 0) || [],
          location: {
            value: meetingPlatform === 'google-meet' ? 'integrations:google:meet' : 'integrations:zoom',
            optionValue: meetingPlatform === 'google-meet' ? 'integrations:google:meet' : 'integrations:zoom',
          },
          'Company-Name': company,
          'Where-are-you-based-of': location,
          'Website-URL': website || '',
          notes: businessDescription,
        },
        timeZone: timezone,
        language: 'en',
        metadata,
      }),
    });

    const calData = await calResponse.json();

    if (!calResponse.ok) {
      console.error('Cal.com API error:', calData);
      throw new Error(calData.message || 'Failed to create booking with Cal.com');
    }

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking: calData,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Cal.com booking:', error);
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 500 });
  }
}

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours.padStart(2, '0')}:${minutes}:00`;
}
