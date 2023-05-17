const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userShema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {timestamps: true})

const User = mongoose.model('User', userShema);

module.exports = User;