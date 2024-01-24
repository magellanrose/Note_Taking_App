const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
  var newNote = req.body
  newNote.id = uuidv4();
  db.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(db), (err, result) => {
    if (err) throw err;
    res.json(newNote);
  })
});

// Route for the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Route for the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);