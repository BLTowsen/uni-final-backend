const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const {getReleaseTracks, getReleaseInfo} = require('../services/musicbrainz');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        res.json('albums');
    }catch(err){
        res.json({message: err});
    }
});

// fetch album info and songs by mbid
router.get('/:mbid', async (req, res) => {
    try {
        const mbid = req.params.mbid;
        const album = await getReleaseInfo(mbid);
        console.log('MusicBrainz album data:', album);
        const songs = await getReleaseTracks(mbid);
        console.log('MusicBrainz album songs:', songs);
        console.log("this is the album cover art archive", album['cover-art-archive']);

        const combinedData = {
            name: album.title,
            mbid: mbid,
            releaseDate: album.date,
            coverArt: album['cover-art-archive'].front ? `https://coverartarchive.org/release/${mbid}/front-250` : `https://coverartarchive.org/release/${mbid}/front`,
            songs: songs
        };
        console.log("this is the combined data", combinedData);
        res.json(combinedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;