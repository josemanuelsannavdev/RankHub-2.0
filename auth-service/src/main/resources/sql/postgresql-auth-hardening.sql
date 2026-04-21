-- Core user table hardening for local + Google auth
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS provider VARCHAR(20) NOT NULL DEFAULT 'LOCAL',
    ADD COLUMN IF NOT EXISTS google_sub VARCHAR(255),
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();

-- Password is nullable for pure Google users
ALTER TABLE users
    ALTER COLUMN password DROP NOT NULL;

-- Keep unique email globally in the auth domain
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Each Google subject can be linked only once
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub) WHERE google_sub IS NOT NULL;

-- No role table: all users are treated as USER in auth-service.
DROP TABLE IF EXISTS user_roles;
