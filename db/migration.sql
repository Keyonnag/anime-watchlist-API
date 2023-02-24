INSERT INTO watchlist (title, image_url, airing, synopsis, episodes, score, review)
VALUES ('Fullmetal Alchemist: Brotherhood', 'https://cdn.myanimelist.net/images/anime/5/47421.jpg', false, 'In order for something to be obtained, something of equal value must be lost. This is the law of equivalent exchange, the bas...', 64, 9.16, 'This is one of my favorite anime of all time. The story is compelling and the characters are well-developed. Highly recommend!');



-- psql anime-watchlist-dev -f migration.sql

SELECT * FROM watchlist