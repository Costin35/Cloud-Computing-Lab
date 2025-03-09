const client = require('../db')

async function getPosts(req, res) {
    try {
        const posts = await client.query('SELECT * FROM posts');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(posts.rows));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
}

async function getPostById(req, res, id) {
    try {
        const query = 'SELECT * FROM posts WHERE id = $1';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Post not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows[0]));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
}

async function createPost(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        const { user_id, title, content } = JSON.parse(body);
        try {
            const query = 'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
            const values = [user_id, title, content];
            const result = await client.query(query, values);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows[0]));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    });
}

async function updatePost(req, res, id) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        const { title, content } = JSON.parse(body);
        try {
            const query = 'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *';
            const values = [title, content, id];
            const result = await client.query(query, values);
            if (result.rows.length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Post not found' }));
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

async function deletePost(req, res, id) {
    try {
        const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Post not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Post deleted successfully' }));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
    }
}

module.exports = {getPostById, getPosts, createPost, deletePost, updatePost}