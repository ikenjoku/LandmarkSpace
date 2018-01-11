const mongoose = require('mongoose');
const Schema = mongoose.Schema

const buzzSchema = new Schema({
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

const Buzzes = mongoose.model('Buzz', buzzSchema);
module.exports = Buzzes;