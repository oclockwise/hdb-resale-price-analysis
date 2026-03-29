const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const createRoutes = require('./routes');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'T0123667e-',
  database: 'hdb_resale',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Use all GET routes from the external file
app.use('/', createRoutes(pool));

// Home page route
app.get('/', (req, res) => {
  res.render('index', { title: 'HDB Resale Data Reports' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
