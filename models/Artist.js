const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: false
    },
    mbid: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    genres: {
        type: Array,
        required: false
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    aliases: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Artist', ArtistSchema);