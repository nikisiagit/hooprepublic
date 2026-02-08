-- Add Stripe columns to users table
ALTER TABLE users ADD COLUMN stripe_account_id TEXT;
ALTER TABLE users ADD COLUMN stripe_details_submitted INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN stripe_charges_enabled INTEGER DEFAULT 0;

-- Add payment fields to booking_participants if needed (or we can use status='joined')
ALTER TABLE booking_participants ADD COLUMN payment_intent_id TEXT;
ALTER TABLE booking_participants ADD COLUMN payment_status TEXT DEFAULT 'pending'; -- pending, paid, refunded
