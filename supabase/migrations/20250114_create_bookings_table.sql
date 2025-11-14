-- Create bookings table for book-a-call submissions
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  selected_date DATE NOT NULL,
  selected_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
  notes TEXT,
  cancellation_reason TEXT,
  email_sent BOOLEAN DEFAULT false,
  reminder_sent BOOLEAN DEFAULT false,
  cancel_token UUID DEFAULT gen_random_uuid() UNIQUE,
  original_booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  rescheduled_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings(email);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings(selected_date);
CREATE INDEX IF NOT EXISTS bookings_cancel_token_idx ON bookings(cancel_token);
CREATE INDEX IF NOT EXISTS bookings_original_id_idx ON bookings(original_booking_id);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for the booking form)
CREATE POLICY "Allow public insert" ON bookings
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow public select by cancel_token (for cancel/reschedule pages)
CREATE POLICY "Allow public select by cancel_token" ON bookings
  FOR SELECT TO anon
  USING (cancel_token IS NOT NULL);

-- Create policy to allow public update by cancel_token (for cancel/reschedule)
CREATE POLICY "Allow public update by cancel_token" ON bookings
  FOR UPDATE TO anon
  USING (cancel_token IS NOT NULL)
  WITH CHECK (cancel_token IS NOT NULL);

-- Create policy to allow authenticated users (admins) to view all bookings
CREATE POLICY "Allow authenticated users to view all" ON bookings
  FOR SELECT TO authenticated
  USING (true);

-- Create policy to allow authenticated users (admins) to update bookings
CREATE POLICY "Allow authenticated users to update" ON bookings
  FOR UPDATE TO authenticated
  USING (true);

-- Create policy to allow authenticated users (admins) to delete bookings
CREATE POLICY "Allow authenticated users to delete" ON bookings
  FOR DELETE TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before update
DROP TRIGGER IF EXISTS update_bookings_updated_at_trigger ON bookings;
CREATE TRIGGER update_bookings_updated_at_trigger
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_bookings_updated_at();
