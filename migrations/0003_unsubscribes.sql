-- Opt-out list for marketing emails. Rows are inserted by the worker's
-- /unsubscribe route when a recipient follows the signed link in an email
-- footer; the invite mailer filters every send against this table.
--
-- `email` is the lowercased address and the primary key, so a repeated
-- unsubscribe is a no-op.
CREATE TABLE IF NOT EXISTS unsubscribes (
  email           TEXT PRIMARY KEY,
  unsubscribed_at TEXT NOT NULL DEFAULT (datetime('now')),
  source          TEXT
);
