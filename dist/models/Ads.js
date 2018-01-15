'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adSchema = new Schema({
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

var Ads = mongoose.model('Ad', adSchema);
module.exports = Ads;
//# sourceMappingURL=Ads.js.map