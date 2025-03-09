const client = require('../db')

async function getUsers(req, res){
    try{
        const users = await client.query('SELECT * FROM users');

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users.rows))
    } catch(error){
        res.writeHead(500)
        res.end(JSON.stringify({ error: error.message }))
    }
}

async function getUserById(req, res, id) {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        console.log(id);
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'User not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows[0]));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
}

async function createUser(req, res){
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        const { name, email } = JSON.parse(body);
        try {
            const query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
            const values = [name, email];
            const result = await client.query(query, values);
            res.writeHead(201);
            res.end(JSON.stringify(result.rows[0]));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    })
}

async function updateUser(req, res, id) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        const { name, email } = JSON.parse(body);
        try {
            const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
            const values = [name, email, id];
            const result = await client.query(query, values);
            if (result.rows.length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'User not found' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.rows[0]));
            }
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    });
}

async function deleteUser(req, res, id) {
    try {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'User not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser, getUserById};