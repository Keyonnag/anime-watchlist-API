DROP TABLE IF EXISTS watchlist CASCADE;

CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT,
  airing BOOLEAN,
  synopsis TEXT,
  episodes INTEGER,
  score DECIMAL(3, 2),
  review TEXT
);

-- psql anime-watchlist-dev -f seed.sql