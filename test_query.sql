SELECT c.id, (SELECT COUNT(DISTINCT booking_date) FROM bookings b WHERE b.court_id = c.id AND b.is_public = 1 AND b.booking_date >= date('now')) as count FROM courts c LIMIT 1;
