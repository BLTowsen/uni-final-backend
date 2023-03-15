const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
});

module.exports = mongoose.model('Song', SongSchema);