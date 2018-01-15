'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
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
    }
});

var Users = mongoose.model('User', userSchema);
//# sourceMappingURL=Users.js.map