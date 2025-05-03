const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('db/music.db'); 
const port = 8080;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get all songs 
app.get('/songs', (req, res) => {
  const sql = 'SELECT * FROM songs'; // Simple query

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows); // Send all the songs
    }
  });
});


process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    }
    console.log('Database  closed.');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


