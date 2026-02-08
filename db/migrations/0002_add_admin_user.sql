-- Add Admin User
-- Password: admin123
INSERT INTO users (id, email, password_hash, name, role, email_verified)
VALUES (
  'user_admin_001', 
  'nikitaovcinnikovs@gmail.com', 
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 
  'HoopAdmin', 
  'admin', 
  1
)
ON CONFLICT(email) DO UPDATE SET 
  role = 'admin', 
  password_hash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  email_verified = 1;
