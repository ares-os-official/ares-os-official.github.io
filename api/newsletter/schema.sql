-- ARES OS Newsletter — D1 schema
-- Additive, minimal. Run once via:
--   wrangler d1 execute ares-newsletter-db --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    subscribed_at TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers (status);

-- Lightweight abuse tracking (no KV/Durable Object needed).
-- Stores only a salted hash of the requester IP, never the raw IP or email.
CREATE TABLE IF NOT EXISTS submission_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_submission_log_ip_time ON submission_log (ip_hash, created_at);
