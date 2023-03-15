const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    }, 
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
});

module.exports = mongoose.model('Album', AlbumSchema);