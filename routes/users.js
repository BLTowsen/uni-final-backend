const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Fetch all the users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

//Fetch a specific user
router.get('/:postId', async (req, res) => {
    try{
        // i love you infinite amounts 
        const user = await User.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

//Add a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.title
    });
    try{
        const savedUser = await user.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

//Delete a user
router.delete('/:userId', async (req, res) => {
    try{
        const removedUser = await User.deleteOne({_id: req.params.postId});
        res.json({message: err});
    }catch(err){
        res.json({message: err});
    }
});

//Update a user's information
router.patch('/:postId', async (req, res) => {
    try{
        const updatedUser = await User.updateOne({_id: req.params.postId}, {$set: {title: req.body.title}});
        res.json(updatedUser);
    }catch(err){
        res.json({message});
    }
});

module.exports = router;