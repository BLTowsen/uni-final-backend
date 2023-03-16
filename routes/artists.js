const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
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
    try{
        const artistName = req.params.name;
        console.log('test')
        const spotifyData = await searchArtist(artistName);
        const artist = spotifyData.artists.items[0];
        console.log(artist.name);
        const artistInfo = await getArtistInfo(artist.name);
        console.log(artistInfo);
        const mbid = artistInfo.id;
        const combinedData = {
            name: artist.name,
            popularity: artist.popularity,
            genres: artist.genres,
            mbid: mbid
        };
        res.json(combinedData);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;