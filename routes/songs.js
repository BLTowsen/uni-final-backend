const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        res.json('songs');
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;