-- HoopRepublic Database Schema for Cloudflare D1
-- Version 3: With player profiles and authentication

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  surname TEXT,
  avatar_url TEXT,
  role TEXT CHECK(role IN ('user', 'admin')) DEFAULT 'user',
  email_verified INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- User profiles (player details)
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  position TEXT CHECK(position IN ('point_guard', 'shooting_guard', 'small_forward', 'power_forward', 'center')),
  skill_level TEXT CHECK(skill_level IN ('d5_rookie', 'd4_rec', 'd3_inter', 'd2_comp', 'd1_elite')),
  bio TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- User preferred days to play (many-to-many)
CREATE TABLE IF NOT EXISTS user_preferred_days (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT CHECK(day IN ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'flexible')) NOT NULL,
  PRIMARY KEY (user_id, day)
);

-- User preferred London areas (many-to-many)
CREATE TABLE IF NOT EXISTS user_preferred_areas (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  area TEXT CHECK(area IN ('central', 'west', 'south_west', 'south', 'east', 'north', 'north_west', 'south_east', 'north_east', 'flexible')) NOT NULL,
  PRIMARY KEY (user_id, area)
);

-- Courts table
CREATE TABLE IF NOT EXISTS courts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  -- Location
  address TEXT NOT NULL,
  postcode TEXT,
  borough TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  -- Metadata
  status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'approved',
  submitted_by TEXT REFERENCES users(id),
  -- Timestamps
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Court tags (flexible tagging system)
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT CHECK(category IN ('type', 'surface', 'amenity', 'feature')) DEFAULT 'feature',
  icon TEXT, -- emoji or icon name
  created_at TEXT DEFAULT (datetime('now'))
);

-- Court-Tag relationship (many-to-many)
CREATE TABLE IF NOT EXISTS court_tags (
  court_id TEXT NOT NULL REFERENCES courts(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (court_id, tag_id)
);

-- Court images
CREATE TABLE IF NOT EXISTS court_images (
  id TEXT PRIMARY KEY,
  court_id TEXT NOT NULL REFERENCES courts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary INTEGER DEFAULT 0,
  uploaded_by TEXT REFERENCES users(id),
  created_at TEXT DEFAULT (datetime('now'))
);

-- Court reviews
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  court_id TEXT NOT NULL REFERENCES courts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(court_id, user_id) -- One review per user per court
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courts_status ON courts(status);
CREATE INDEX IF NOT EXISTS idx_courts_borough ON courts(borough);
CREATE INDEX IF NOT EXISTS idx_courts_location ON courts(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_court_tags_court ON court_tags(court_id);
CREATE INDEX IF NOT EXISTS idx_court_tags_tag ON court_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_court_images_court ON court_images(court_id);
CREATE INDEX IF NOT EXISTS idx_reviews_court ON reviews(court_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

-- Insert default tags
INSERT OR IGNORE INTO tags (id, name, category, icon) VALUES
  ('tag_indoor', 'Indoor', 'type', '🏟️'),
  ('tag_outdoor', 'Outdoor', 'type', '🌳'),
  ('tag_hardwood', 'Hardwood', 'surface', '🪵'),
  ('tag_concrete', 'Concrete', 'surface', '🧱'),
  ('tag_tarmac', 'Tarmac', 'surface', '⬛'),
  ('tag_synthetic', 'Synthetic', 'surface', '🔷'),
  ('tag_lighting', 'Floodlit', 'amenity', '💡'),
  ('tag_free', 'Free to use', 'amenity', '🆓'),
  ('tag_paid', 'Paid booking', 'amenity', '💷'),
  ('tag_changing', 'Changing rooms', 'amenity', '🚿'),
  ('tag_parking', 'Parking', 'amenity', '🅿️'),
  ('tag_fullcourt', 'Full court', 'feature', '🏀'),
  ('tag_halfcourt', 'Half court', 'feature', '⛹️'),
  ('tag_3x3', '3x3 court', 'feature', '3️⃣'),
  ('tag_public', 'Public access', 'feature', '🔓'),
  ('tag_membership', 'Membership required', 'feature', '🔒');
