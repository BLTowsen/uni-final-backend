const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const mongoose = require('mongoose');
const { searchArtist } = require('../services/spotify');
const { getArtistInfo, getArtistReleases } = require('../services/musicbrainz');

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
      var combinedData = {};
      let mbid = null;
      if (matchedArtists.length > 0) {
        console.log('Artist already exists in local database');
        mbid = matchedArtists[0].mbid;
        // get artists releases from musicbrainz
        var albums = await getArtistReleases(mbid);

        // for each album in albums take out the cover art and save as image url
        albums = albums.map(album => {
          return {
            title: album.title,
            releaseDate: album.date,
            // return the thumbnail image if it exists, otherwise return the full image
            coverArt: album['cover-art-archive'].front ? `https://coverartarchive.org/release/${album.id}/front-250` : `https://coverartarchive.org/release/${album.id}/front`,
            mbid: album.id
          };
        });

        combinedData = {
          name: artist.name,
          popularity: artist.popularity,
          genres: artist.genres,
          mbid: mbid,
          aliases: matchedArtists[0].aliases,
          albums: albums
        };
      } else {
        console.log('Artist does not exist in local database');
        const artistInfo = await getArtistInfo(artist.name);
        console.log('MusicBrainz artist data:', artistInfo);

        var albums = await getArtistReleases(mbid);

        albums = albums.map(album => {
          return {
            title: album.title,
            releaseDate: album.date,
            coverArt: album['cover-art-archive'].front ? `https://coverartarchive.org/release/${album.id}/front-250` : ``,
            mbid: album.id
          };
        });
        mbid = artistInfo.id;
        combinedData = {
          name: artist.name,
          popularity: artist.popularity,
          genres: artist.genres,
          mbid: mbid,
          aliases: artistInfo.aliases,
          albums: albums
        };
        const savedData = await new Artist(combinedData).save();
      }
  
      
      res.json(combinedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // fetch all artists that match a search term
router.get('/search/:name', async (req, res) => {
    try {
      const artistName = req.params.name;
      console.log('Search artist:', artistName);
      const spotifyData = await searchArtist(artistName);
      const artists = spotifyData.artists.items;
      console.log('Spotify artist data:', artists);
      // put the artists into an array in the combinedData format
      const combinedData = artists.map(artist => {
        return {
          name: artist.name,
          popularity: artist.popularity,
          genres: artist.genres,
          mbid: null
        };
      });
      res.json(combinedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  

module.exports = router;