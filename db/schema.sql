CREATE TABLE IF NOT EXISTS notices (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS qna_posts (
  id BIGSERIAL PRIMARY KEY,
  nickname VARCHAR(40) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  title VARCHAR(160) NOT NULL,
  content TEXT NOT NULL,
  attachment_url TEXT,
  is_secret BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(30) NOT NULL DEFAULT 'waiting',
  admin_answer TEXT,
  ip_hash VARCHAR(128),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS qna_posts_created_at_idx ON qna_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS qna_posts_ip_hash_created_at_idx ON qna_posts (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS notices_created_at_idx ON notices (created_at DESC);
