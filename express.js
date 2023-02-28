const express = require('express');
const client = require('./pg');
const cors = require('cors');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.DATABASE_URL;

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);

app.get('/getRandomAnime', async (req, res) => {
	try {
		const apiUrl = 'https://api.jikan.moe/v4/random/anime';
		const animeDataList = [];

		while (animeDataList.length < 9) {
			const response = await axios.get(apiUrl);
			const animeData = response.data.data;
			const animeDataObject = {
				title: animeData.title,
				image_url: animeData.images.jpg.small_image_url,
				airing: animeData.airing,
				synopsis: animeData.synopsis,
				episodes: animeData.episodes,
				score: animeData.score,
				review: '',
			};
			if (animeData.rating === 'PG-13 - Teens 13 or older') {
				animeDataList.push(animeDataObject);
			}
		}
		res.json(animeDataList);
	} catch (error) {
		console.error(`Error getting random anime: ${error.message}`);
		res.status(500).json({ message: 'An error occurred' });
	}
});

// GET route to retrieve all anime titles in user's watchlist
app.get('/watchlist', async (req, res) => {
	try {
		const result = await client.query('SELECT * FROM watchlist');
		res.json(result.rows);
	} catch (error) {
		console.error(`Error retrieving watchlist: ${error.message}`);
		res.status(500).json({ message: 'An error occurred' });
	}
});

// POST route to add a new anime title to user's watchlist
app.post('/watchlist', async (req, res) => {
	const { title, image_url, airing, synopsis, episodes, score, review } =
		req.body;

	const insertQuery =
		'INSERT INTO watchlist (title, image_url, airing, synopsis, episodes, score, review) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

	try {
		const result = await client.query(insertQuery, [
			title,
			image_url,
			airing,
			synopsis,
			episodes,
			score,
			review,
		]);
		res.json(result.rows[0]);
	} catch (error) {
		console.error(`Error adding anime to watchlist: ${error.message}`);
		res.status(500).json({ message: 'An error occurred' });
	}
});

// GET route to retrieve a specific anime title from user's watchlist by ID
app.get('/watchlist/:id', async (req, res) => {
	const id = req.params.id;
	const selectQuery = 'SELECT * FROM watchlist WHERE id = $1';

	try {
		const result = await client.query(selectQuery, [id]);
		if (result.rows.length === 0) {
			res.status(404).json({ message: 'Anime not found' });
		} else {
			res.json(result.rows[0]);
		}
	} catch (error) {
		console.error(`Error retrieving anime from watchlist: ${error.message}`);
		res.status(500).json({ message: 'An error occurred' });
	}
});

// PUT route to update a specific anime title in user's watchlist by ID
app.put('/watchlist/:id', async (req, res) => {
	const id = req.params.id;
	const { title, image_url, airing, synopsis, episodes, score, review } =
		req.body;

	const updateQuery =
		'UPDATE watchlist SET title = $1, image_url = $2, airing = $3, synopsis = $4, episodes = $5, score = $6, review = $7 WHERE id = $8 RETURNING *';

	try {
		const result = await client.query(updateQuery, [
			title,
			image_url,
			airing,
			synopsis,
			episodes,
			score,
			review,
			id,
		]);
		if (result.rows.length === 0) {
			res.status(404).json({ message: 'Anime not found' });
		} else {
			res.json(result.rows[0]);
		}
	} catch (error) {
		console.error(`Error updating anime in watchlist: ${error.message}`);
		res.status(500).json({ message: 'An error occurred' });
	}
});

// DELETE route to remove a specific anime title from user's watchlist by ID
app.delete('/watchlist/:id', async (req, res) => {
	const id = req.params.id;
	const deleteQuery = 'DELETE FROM watchlist WHERE id = $1 RETURNING *';

	try {
		const result = await client.query(deleteQuery, [id]);
		if (result.rows.length === 0) {
			res.status(404).json({ message: 'Anime not found' });
		} else {
			res.json(result.rows[0]);
		}
	} catch (error) {
		console.error(`Error deleting anime from watchlist: ${error.message}`);
		res.status(500).json({ message: 'An error occurred' });
	}
});

app.use((req, res) => {
	res.status(404).type('text/plain').send('Not found');
});

// Server Listening
app.listen(port, () => {
	console.log(`Server listening`);
});
