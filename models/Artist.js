const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
});

module.exports = mongoose.model('Artist', ArtistSchema);