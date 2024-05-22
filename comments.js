// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');

// Function to handle requests
function requestHandler(req, res) {
  // Parse the request url
  var parsedUrl = url.parse(req.url);
  // Get the path name
  var pathName = parsedUrl.pathname;
  // Get the query string as an object
  var query = querystring.parse(parsedUrl.query);
  // Get the method
  var method = req.method;

  // If the request is a POST request
  if (method === 'POST' && pathName === '/comments') {
    // Create a variable to store the data
    var body = '';
    // Listen for data
    req.on('data', function(data) {
      body += data;
    });
    // When the request ends
    req.on('end', function() {
      // Parse the body
      var comment = querystring.parse(body);
      // Read the comments from the file
      fs.readFile('comments.json', function(err, data) {
        if (err) {
          // If the file doesn't exist
          if (err.code === 'ENOENT') {
            // Create an empty array
            var comments = [];
            // Add the comment to the array
            comments.push(comment);
            // Write the comments to the file
            fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
              if (err) {
                // Send an error response
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
              } else {
                // Send a success response
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end('Created');
              }
            });
          } else {
            // Send an error response
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          }
        } else {
          // Parse the comments
          var comments = JSON.parse(data);
          // Add the comment to the array
          comments.push(comment);
          // Write the comments to the file
          fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
            if (err) {
              // Send an error response
              res.writeHead(500,