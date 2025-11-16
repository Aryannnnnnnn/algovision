// Script to fetch Cal.com event types
// Run with: node scripts/get-cal-event-types.js

const CAL_API_KEY = 'cal_live_4ea0b7ba7cb9a033b6b61eacd728c149';

async function getEventTypes() {
  try {
    const response = await fetch(`https://api.cal.com/v1/event-types?apiKey=${CAL_API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data);
      return;
    }

    console.log('\n=== Your Cal.com Event Types ===\n');

    if (data.event_types && data.event_types.length > 0) {
      data.event_types.forEach((event) => {
        console.log(`Event: ${event.title}`);
        console.log(`ID: ${event.id}`);
        console.log(`Slug: ${event.slug}`);
        console.log(`Link: https://cal.com/${event.slug}`);
        console.log('---');
      });
    } else {
      console.log('No event types found.');
    }

    // Look for discovery-call
    const discoveryCall = data.event_types?.find(e =>
      e.slug.includes('discovery-call') || e.title.toLowerCase().includes('discovery')
    );

    if (discoveryCall) {
      console.log('\n✅ Found "discovery-call" event!');
      console.log(`Event Type ID: ${discoveryCall.id}`);
      console.log(`\nAdd this to your .env.local:`);
      console.log(`CAL_EVENT_TYPE_ID=${discoveryCall.id}`);
    }

  } catch (error) {
    console.error('Failed to fetch event types:', error);
  }
}

getEventTypes();
