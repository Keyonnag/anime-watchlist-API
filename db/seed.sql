DROP TABLE IF EXISTS watchlist CASCADE;

CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT,
  airing BOOLEAN NOT NULL,
  synopsis TEXT NOT NULL,
  episodes INTEGER NOT NULL,
  start_date DATE NOT NULL,
  score DECIMAL(3, 2) NOT NULL,
  review TEXT
);

-- psql anime-watchlist-dev -f seed.sql