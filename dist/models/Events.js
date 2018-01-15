'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    image: { type: String },
    date: { type: Date },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

var Events = mongoose.model('Event', eventSchema);
module.exports = Events;
//# sourceMappingURL=Events.js.map