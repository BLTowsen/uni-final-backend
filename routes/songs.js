const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Spotify = require('../services/spotify');
const { getTrackInfo, getTrackCredits, getTrackReleases } = require('../services/musicbrainz');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        const tracks = await Spotify.getTracks("11dFghVXANMlKmJXsNCbNl");
        res.json(tracks);
    }catch(err){
        res.json({message: err});
    }
});

// get a song from musicbrainz using mbid
router.get('/:mbid', async (req, res) => {
    try {
        const mbid = req.params.mbid;
        console.log("Mbid ", mbid);
        const song = await getTrackInfo(mbid);
        console.log('MusicBrainz song data:', song);
        // get track credits from musicbrainz
        const credits = await getTrackCredits(mbid);
        const trackReleases = await getTrackReleases(mbid);
        const combinedData = {
            title: song.title,
            mbid: mbid,
            length: song.length,
            artist: song.artist,
            credits: credits,
            releases: trackReleases
        };
        res.json(combinedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;