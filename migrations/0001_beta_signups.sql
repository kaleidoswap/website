CREATE TABLE IF NOT EXISTS beta_signups (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  email        TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  company      TEXT,
  intended_use TEXT NOT NULL,
  telegram     TEXT,
  nostr        TEXT,
  ip           TEXT,
  user_agent   TEXT,
  status       TEXT NOT NULL DEFAULT 'pending',
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_beta_signups_created_at ON beta_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_beta_signups_status ON beta_signups(status);
