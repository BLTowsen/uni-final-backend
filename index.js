const express = require('express');
const app = express();
const port = 3000;

// data for the API
const artists = [
  { id: 1, name: 'Vincent van Gogh', bio: 'Dutch post-impressionist painter' },
  { id: 2, name: 'Pablo Picasso', bio: 'Spanish painter, sculptor, and printmaker' },
  { id: 3, name: 'Leonardo da Vinci', bio: 'Italian Renaissance polymath' }
];

const artworks = [
  { id: 1, artistId: 1, title: 'The Starry Night', year: 1889 },
  { id: 2, artistId: 1, title: 'Irises', year: 1889 },
  { id: 3, artistId: 2, title: 'Guernica', year: 1937 },
  { id: 4, artistId: 2, title: 'The Old Guitarist', year: 1903 },
  { id: 5, artistId: 3, title: 'The Mona Lisa', year: 1503 }
];

// parse incoming JSON bodies
app.use(express.json());

// get a list of all artists
app.get('/api/artists', (req, res) => {
  res.json(artists);
});

// get a specific artist by id
app.get('/api/artists/:id', (req, res) => {
  const artist = artists.find(a => a.id === parseInt(req.params.id));
  if (!artist) return res.status(404).send('Artist not found');
  res.json(artist);
});

// create a new artist
app.post('/api/artists', (req, res) => {
  const artist = {
    id: artists.length + 1,
    name: req.body.name,
    bio: req.body.bio
  };
  artists.push(artist);
  res.json(artist);
});

// update an artist by id
app.put('/api/artists/:id', (req, res) => {
  const artist = artists.find(a => a.id === parseInt(req.params.id));
  if (!artist) return res.status(404).send('Artist not found');
  artist.name = req.body.name;
  artist.bio = req.body.bio;
  res.json(artist);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});