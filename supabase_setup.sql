-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert into the waitlist
CREATE POLICY "Allow anonymous inserts"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure selects are forbidden (no policy for SELECT is created, so by default it's denied)
-- Explicitly denying select for anon just to be absolutely sure, though not strictly required
-- CREATE POLICY "Deny anonymous selects" ON waitlist FOR SELECT TO anon USING (false);
