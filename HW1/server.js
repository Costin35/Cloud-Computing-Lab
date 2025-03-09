const { getUsers, createUser, updateUser, getUserById, deleteUser} = require('./routes/user')
const {getPostById, getPosts, createPost, updatePost, deletePost} = require('./routes/post')
const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/social/users' && req.method === 'GET'){
        getUsers(req, res)
    } else if(req.url.match(/\/social\/users\/[0-9]+/) && req.method === 'GET'){
        const id = req.url.split('/')[3]
        getUserById(req, res, id)
    } else if(req.url === '/social/users' && req.method === 'POST'){
        createUser(req, res)
    } else if(req.url.match(/\/social\/users\/[0-9]+/) && req.method === 'PUT'){
        const id =req.url.split('/')[3]
        updateUser(req, res, id)
    } else if(req.url.match(/\/social\/users\/[0-9]+/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3]
        deleteUser(req, res, id)
    } else if (req.url === '/social/posts' && req.method === 'GET') {
        getPosts(req, res);
    } else if (req.url.match(/\/social\/posts\/[0-9]+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getPostById(req, res, id);
    } else if (req.url === '/social/posts' && req.method === 'POST') {
        createPost(req, res);
    } else if (req.url.match(/\/social\/posts\/[0-9]+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updatePost(req, res, id);
    } else if (req.url.match(/\/social\/posts\/[0-9]+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deletePost(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
})

const PORT = 5000
server.listen(PORT, () => console.log('Server running on port ${PORT}'))