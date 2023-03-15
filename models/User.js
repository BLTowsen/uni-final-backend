
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);