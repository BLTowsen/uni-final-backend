const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Spotify = require('../services/spotify');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        const tracks = await Spotify.getTracks("11dFghVXANMlKmJXsNCbNl");
        res.json(tracks);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;