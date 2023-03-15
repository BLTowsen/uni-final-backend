const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const usersRoute = require('./routes/users');
const artistsRoute = require('./routes/artists');
const albumsRoute = require('./routes/albums');
const songsRoute = require('./routes/songs');

app.use('/users', usersRoute);
app.use('/artists', artistsRoute);
app.use('/albums', albumsRoute);
app.use('/songs', songsRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
  res.end();
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });  

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});