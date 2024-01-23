const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));


// Route for the notes.html file
app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Route for the index.html file
app.get('/paths', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);