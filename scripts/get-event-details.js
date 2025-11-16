// Script to fetch detailed Cal.com event type info
const CAL_API_KEY = 'cal_live_4ea0b7ba7cb9a033b6b61eacd728c149';
const EVENT_TYPE_ID = '2924992';

async function getEventDetails() {
  try {
    const response = await fetch(`https://api.cal.com/v1/event-types/${EVENT_TYPE_ID}?apiKey=${CAL_API_KEY}`, {
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

    console.log('\n=== Event Type Details ===\n');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Failed to fetch event details:', error);
  }
}

getEventDetails();
