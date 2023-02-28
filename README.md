# Animuse

This is the backend for my Animuse Application. See https://github.com/Keyonnag/anime-watchlist-app-frontend

Animuse is an anime watchlist app that allows users to keep track of the anime they want to watch or have already watched. This application was built using PostgresSQL, Express, PG, Axios, React, and Bootstrap CDN.

The app uses Jikan API to display a list of 9 random animes on the home page, filtered by only PG-13 animes to avoid any adult content. Users can generate a new list of 9 animes by clicking on the "More Anime" button. Users can also add an anime to their watchlist by clicking on the "Add to Watchlist" button on an anime card.

The watchlist page displays all the animes that the user has added to their watchlist. Users can update their review of the anime and also delete an Anime from the watchlist showing full CRUD functionality.

## Installation

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a database in PostgreSQL and update the `.env` file with your database information.
4. Run the database migration by running `npm run migrate`.
5. Start the server by running `npm start`.

## Dependencies

The following dependencies were used in this project:

- Express
- pg
- dotenv
- cors
- nodemon (devDependency)
- React (frontend)
- bootstrap CDN (frontend)
- axios (frontend)

## API

The app uses the Jikan API to generate the list of animes on the home page. Visit the [Jikan API documentation](https://jikan.moe/docs) to learn more about the API.

## RESTful API Routes

- get ['/getRandomAnime']: Pulls 9 random PG-13 Anime's from Jikan API.
- get ['/watchlist']: Retrieves user's saved animes.
- post['/watchlist']: Add anime to watchlist DB.
- get ['/watchlist:id']: Retrieves an anime from watchlist DB by ID.
- put ['/watchlist:id']: Updates anime by id in watchlist DB.
- delete ['/getRandomAnime:id']: Deletes anime by id from watchlist DB.

## Future Improvements

- Add user authentication and authorization.
- Allow users to rate an anime and sort their watchlist by rating.
- Allow users to search for an anime and add it to their watchlist.
- Allow users to share their watchlist with friends.

## Authors

- Keyonna Garfine

## Acknowledgments

- The creators of Jikan API.
- The creators of PostgresSQL, Express, React, and Bootstrap.
