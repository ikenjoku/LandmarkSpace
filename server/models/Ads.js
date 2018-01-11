const mongoose = require('mongoose');
const Schema = mongoose.Schema

const adSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: { type: String },
    contactowner: { type: String, required: true },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

const Ads = mongoose.model('Ad', adSchema);
module.exports = Ads;