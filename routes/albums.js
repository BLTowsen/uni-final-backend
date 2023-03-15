const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        res.json('albums');
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;