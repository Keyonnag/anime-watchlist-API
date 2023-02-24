const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Pool({
	connectionString: process.env.DATABASE_URL,
});

module.exports = client;
