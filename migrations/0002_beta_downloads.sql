-- Per-recipient beta download tracking. Rows are inserted by the worker's
-- GET /dl route each time a tokenized invite link is used.
CREATE TABLE IF NOT EXISTS beta_downloads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  signup_id   INTEGER,
  campaign_id TEXT,
  ts          TEXT DEFAULT (datetime('now')),
  user_agent  TEXT,
  ip          TEXT
);

CREATE INDEX IF NOT EXISTS idx_beta_downloads_signup ON beta_downloads(signup_id);
CREATE INDEX IF NOT EXISTS idx_beta_downloads_ts ON beta_downloads(ts);
