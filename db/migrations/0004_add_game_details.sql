-- Add game details to bookings table
ALTER TABLE bookings ADD COLUMN title TEXT;
ALTER TABLE bookings ADD COLUMN description TEXT;
ALTER TABLE bookings ADD COLUMN price REAL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN level TEXT; -- optional, linked to skill levels
