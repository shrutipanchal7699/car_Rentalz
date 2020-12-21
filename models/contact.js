const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email:{
        type: String
    },
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact',contactSchema);