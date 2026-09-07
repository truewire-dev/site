CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  intent TEXT NOT NULL CHECK (intent IN ('service', 'cloud', 'help')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  api_url TEXT NOT NULL DEFAULT '',
  details TEXT NOT NULL DEFAULT '',
  timeline TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'closed')),
  updated_at INTEGER NOT NULL
);
CREATE INDEX inquiries_status_created ON inquiries(status, created_at);
CREATE INDEX inquiries_email_created ON inquiries(email, created_at);
CREATE INDEX inquiries_source_created ON inquiries(source, created_at);

-- Counts of form-page requests, not people. No cookies, visitor IDs, or IP storage.
CREATE TABLE funnel_daily (
  day TEXT NOT NULL,
  intent TEXT NOT NULL,
  source TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(day, intent, source)
);
