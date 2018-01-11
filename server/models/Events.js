const mongoose = require('mongoose');
const Schema = mongoose.Schema


const eventSchema = new Schema({
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

const Events = mongoose.model('Event', eventSchema);
module.exports = Events;