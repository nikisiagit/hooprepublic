-- Migration: Add Google Auth support
ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;
-- Note: password_hash remains NOT NULL on existing tables.
-- Code should handle inserting dummy value if needed.
