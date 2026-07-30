-- Delivery events (sent / delivered / opened / clicked / bounced /
-- complained) pushed by the email provider into the worker's
-- POST /api/resend-webhook route.
--
-- `event` is the provider's type with the "email." prefix removed.
-- `campaign_hint` is the campaign_id of the beta_signups row matching the
-- recipient when the event arrived (NULL when no signup matches).
CREATE TABLE IF NOT EXISTS email_events (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT,
  event         TEXT,
  email_id      TEXT,
  campaign_hint TEXT,
  ts            TEXT
);

CREATE INDEX IF NOT EXISTS idx_email_events_email ON email_events(email);
CREATE INDEX IF NOT EXISTS idx_email_events_event ON email_events(event);
