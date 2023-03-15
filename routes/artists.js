const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        res.json('artists');
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;