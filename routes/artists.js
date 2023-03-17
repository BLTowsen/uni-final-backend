const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const mongoose = require('mongoose');
const { searchArtist } = require('../services/spotify');
const { getArtistInfo } = require('../services/musicbrainz');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        res.json('artists');
    }catch(err){
        res.json({message: err});
    }
});

router.get('/:name', async (req, res) => {
    try {
      const artistName = req.params.name;
      console.log('Search artist:', artistName);
  
      // Search Spotify API for artist data
      const spotifyData = await searchArtist(artistName);
      const artist = spotifyData.artists.items[0];
      console.log('Spotify artist data:', artist);
  
      // Get artist info from local database
      const matchedArtistsCursor = await mongoose.connection.db.collection('artists').find({ name: { $regex: artist.name, $options: 'i' } });
      const matchedArtists = await matchedArtistsCursor.toArray();
      console.log('Matched artists in local database:', matchedArtists);
  
      let mbid = null;
      if (matchedArtists.length > 0) {
        console.log('Artist already exists in local database');
        mbid = matchedArtists[0].mbid;
      } else {
        console.log('Artist does not exist in local database');
        const artistInfo = await getArtistInfo(artist.name);
        console.log('MusicBrainz artist data:', artistInfo);
        mbid = artistInfo.id;
        const combinedData = {
          name: artist.name,
          popularity: artist.popularity,
          genres: artist.genres,
          mbid: mbid
        };
        const savedData = await new Artist(combinedData).save();
        console.log('New artist saved to local database:', savedData.ops[0]);
      }
  
      const combinedData = {
        name: artist.name,
        popularity: artist.popularity,
        genres: artist.genres,
        mbid: mbid
      };
      res.json(combinedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

module.exports = router;