'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buzzSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    content: { type: String, required: true },
    studentcategory: { type: String }
});

var Buzzes = mongoose.model('Buzz', buzzSchema);
module.exports = Buzzes;
//# sourceMappingURL=Buzzes.js.map