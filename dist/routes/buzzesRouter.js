'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var buzzesRouter = express.Router();
buzzesRouter.use(bodyParser.json());

var mongoose = require('mongoose');
var Buzzes = require('../models/Buzzes');

buzzesRouter.route('/').get(function (req, res, next) {
    Buzzes.find({}).then(function (buzzes) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(buzzes);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    Buzzes.create(req.body).then(function (buzz) {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(buzz);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).put(function (req, res, next) {
    res.statusCode = 403;
    res.end('PUT operation not supported');
}).delete(function (req, res, next) {
    Buzzes.remove({}).then(function (response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

buzzesRouter.route('/:buzzId').get(function (req, res, next) {
    Buzzes.findById(req.params.buzzId).then(function (buzz) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(buzz);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    res.end('POST operation not supported');
}).put(function (req, res, next) {
    Buzzes.findByIdAndUpdate(req.params.buzzId, {
        $set: req.body
    }, { new: true }).then(function (buzz) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(buzz);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).delete(function (req, res, next) {
    Buzzes.findByIdAndRemove(req.params.buzzId).then(function (response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

module.exports = buzzesRouter;
//# sourceMappingURL=buzzesRouter.js.map