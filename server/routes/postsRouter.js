const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = express.Router();
postsRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Posts = require('../models/Posts');

postsRouter.route('/')
    .get((req, res, next) => {
        Posts.find({})
            .then((posts) => {
                res.json(posts)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Posts.create(req.body)
            .then((post) => {
                console.log('Post Created', post);
                res.statusCode = 201;
                res.json(post)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        Posts.remove({})
            .then((response) => {
                res.statusCode = 203;
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

postsRouter.route('/:postId')
    .get((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                res.json(post)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        Posts.findByIdAndUpdate(req.params.postId, {
                $set: req.body
            }, { new: true })
            .then((post) => {
                res.json(post)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Posts.findByIdAndRemove(req.params.postId)
            .then((response) => {
                res.statusCode = 203;
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

postsRouter.route('/:postId/comments')
    .get((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                if (post !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(post.comments);
                } else {
                    err = new Error(`Post ${req.params.postId} not found!`);
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                if (post !== null) {
                    post.comments.push(req.body);
                    post.save()
                        .then((post) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(post);
                        }, (err) => next(err));
                } else {
                    err = new Error(`Post ${req.params.postId} not found!`);
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /posts/' + req.params.postId + '/comments');
    })
    .delete((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                if (post !== null) {
                    for (let i = (post.comments.length - 1); i >= 0; i--) {
                        post.comments.id(dish.comments[i]._id).remove();
                    }
                    post.save()
                        .then((post) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(post);
                        }, (err) => next(err));
                } else {
                    err = new Error(`Post ${req.params.postId} not found!`);
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

postsRouter.route('/:postId/comments/:commentId')
    .get((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                if (post !== null && post.comments.id(req.params.commentId) !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(post.comments.id(req.params.commentId));
                } else if (post == null) {
                    err = new Error(`Post ${req.params.postId} not found!`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found!`);
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.status(403).json({ "message": "POST operation not supported on /posts/" + req.params.postId + "/comments/" + req.params.commentId });
    })
    .put((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                if (post !== null && post.comments.id(req.params.commentId) !== null) {
                    if (req.body.rating) {
                        post.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        post.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                    post.save()
                        .then((post) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(post);
                        }, (err) => next(err));
                } else if (post == null) {
                    err = new Error(`Post ${req.params.postId} not found!`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found!`);
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Posts.findById(req.params.postId)
            .then((post) => {
                if (post !== null && post.comments.id(req.params.commentId) !== null) {
                    post.comments.id(req.params.commentId).remove();
                    post.save()
                        .then((post) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(post);
                        }, (err) => next(err));
                } else if (post == null) {
                    err = new Error(`Post ${req.params.postId} not found!`);
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error(`Comment ${req.params.commentId} not found!`);
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = postsRouter;