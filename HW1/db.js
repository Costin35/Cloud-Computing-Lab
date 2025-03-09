const { Client } = require('pg');

const client = new Client({
  user: 'username',
  host: 'localhost',
  database: 'socialapidb',
  password: 'password12345',
  port: 5559
});

client.connect()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error:', err));

const createTables = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
        );
        CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL
        );
    `;
    try {
        await client.query(query);
        console.log('The tabels have been succesfuly created');
    } catch (error) {
        console.error('Error: The tables were not created', error);
    }
};

createTables()

module.exports = client;