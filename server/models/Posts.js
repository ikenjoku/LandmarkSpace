const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });


const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    image: { type: String, required: true },
    content: { type: String, required: true },
    tag: { type: String },
    comments: [commentSchema],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

const Posts = mongoose.model('Post', postSchema);
module.exports = Posts;