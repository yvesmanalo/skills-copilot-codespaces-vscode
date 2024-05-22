// Create web server
// 1. Create a web server
// 2. Create a route for /comments
// 3. Set response header to 'application/json'
// 4. Create an array of objects with comments (id, username, comment)
// 5. Send JSON response with the array of comments
// 6. Listen on port 3000

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/comments') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    const comments = [
      {
        id: 1,
        username: 'john_doe',
        comment: 'Hello, World!',
      },
      {
        id: 2,
        username: 'jane_doe',
        comment: 'Hello, Node.js!',
      },
    ];

    res.end(JSON.stringify(comments));
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});