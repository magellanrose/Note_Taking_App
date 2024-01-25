const express = require('express');
const path = require('path');
let db = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded());

//GET notes from the server
app.get('/api/notes', (req, res) => res.json(db));

//ADD notes to the server
app.post('/api/notes', (req, res) => {
  var newNote = req.body
  newNote.id = uuidv4();
  db.push(newNote);

  // Write the updated notes array to the db.json file
  fs.writeFile('./db/db.json', JSON.stringify(db), (err, result) => {
    if (err) throw err;
    res.json(newNote);
  });
});

// Route for the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Route for the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// DELETE route to delete notes
app.delete('/api/notes/:id', (req, res) => {
  const noteIdToDelete = req.params.id;

  // Filter out the note with the given id
  db = db.filter((note) => note.id !== noteIdToDelete);

  // Write the updated notes to the file
  fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
    if (err) throw err;
    res.json({ message: 'Note deleted successfully' });
  });
});

// Start the server and listen for the specified PORT
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);