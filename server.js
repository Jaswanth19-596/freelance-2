const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
console.log(`Serving static files from ${publicServedFilesPath}`);
server.use(express.static(publicServedFilesPath));

// POST route to handle form submission and generate mad lib response
server.post('/ITC505/lab-7/', (req, res) => {
  const { noun1, verb, adjective, place, noun2 } = req.body;
  const madLib = `Once upon a time in ${place}, there was a ${adjective} ${noun1} who loved to ${verb} with a ${noun2}.`;
  res.send(madLib);
});

// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log(`Ready on localhost:${port}!`));
