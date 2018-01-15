'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var postsRouter = express.Router();
postsRouter.use(bodyParser.json());

var mongoose = require('mongoose');
var Posts = require('../models/Posts');

postsRouter.route('/').get(function (req, res, next) {
    Posts.find({}).then(function (posts) {
        res.json(posts);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    Posts.create(req.body).then(function (post) {
        console.log('Post Created', post);
        res.statusCode = 201;
        res.json(post);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).put(function (req, res, next) {
    res.statusCode = 403;
    res.end('PUT operation not supported');
}).delete(function (req, res, next) {
    Posts.remove({}).then(function (response) {
        res.statusCode = 203;
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

postsRouter.route('/:postId').get(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        res.json(post);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    res.end('POST operation not supported');
}).put(function (req, res, next) {
    Posts.findByIdAndUpdate(req.params.postId, {
        $set: req.body
    }, { new: true }).then(function (post) {
        res.json(post);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).delete(function (req, res, next) {
    Posts.findByIdAndRemove(req.params.postId).then(function (response) {
        res.statusCode = 203;
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

postsRouter.route('/:postId/comments').get(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        if (post !== null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(post.comments);
        } else {
            err = new Error('Post ' + req.params.postId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        if (post !== null) {
            post.comments.push(req.body);
            post.save().then(function (post) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, function (err) {
                return next(err);
            });
        } else {
            err = new Error('Post ' + req.params.postId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).put(function (req, res, next) {
    res.statusCode = 403;
    res.end('PUT operation not supported on /posts/' + req.params.postId + '/comments');
}).delete(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        if (post !== null) {
            for (var i = post.comments.length - 1; i >= 0; i--) {
                post.comments.id(dish.comments[i]._id).remove();
            }
            post.save().then(function (post) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, function (err) {
                return next(err);
            });
        } else {
            err = new Error('Post ' + req.params.postId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

postsRouter.route('/:postId/comments/:commentId').get(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        if (post !== null && post.comments.id(req.params.commentId) !== null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(post.comments.id(req.params.commentId));
        } else if (post == null) {
            err = new Error('Post ' + req.params.postId + ' not found!');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Comment ' + req.params.commentId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    res.status(403).json({ "message": "POST operation not supported on /posts/" + req.params.postId + "/comments/" + req.params.commentId });
}).put(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        if (post !== null && post.comments.id(req.params.commentId) !== null) {
            if (req.body.rating) {
                post.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                post.comments.id(req.params.commentId).comment = req.body.comment;
            }
            post.save().then(function (post) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, function (err) {
                return next(err);
            });
        } else if (post == null) {
            err = new Error('Post ' + req.params.postId + ' not found!');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Comment ' + req.params.commentId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).delete(function (req, res, next) {
    Posts.findById(req.params.postId).then(function (post) {
        if (post !== null && post.comments.id(req.params.commentId) !== null) {
            post.comments.id(req.params.commentId).remove();
            post.save().then(function (post) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, function (err) {
                return next(err);
            });
        } else if (post == null) {
            err = new Error('Post ' + req.params.postId + ' not found!');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Comment ' + req.params.commentId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

module.exports = postsRouter;
//# sourceMappingURL=postsRouter.js.map