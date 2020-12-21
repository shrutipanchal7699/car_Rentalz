const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook: {
        type: String
    },
    google: {
        type: String
    },
    firstName: {
        type: String
    },
    lastname: {
        type: String
    },
    image: {
        type: String,
        default: './image/userLogo.png'
    },
    email: {
        type: String

    },
    password:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('User',userSchema);