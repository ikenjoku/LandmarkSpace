const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: { type: String },
    facebookId: { type: String },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
});


const Users = mongoose.model('User', userSchema);