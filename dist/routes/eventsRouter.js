'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var eventsRouter = express.Router();
eventsRouter.use(bodyParser.json());

var mongoose = require('mongoose');
var Events = require('../models/Events');

eventsRouter.route('/').get(function (req, res, next) {
    Events.find({}).then(function (events) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(events);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    Events.create(req.body).then(function (event) {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).put(function (req, res, next) {
    res.statusCode = 403;
    res.end('PUT operation not supported');
}).delete(function (req, res, next) {
    Events.remove({}).then(function (response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

eventsRouter.route('/:eventId').get(function (req, res, next) {
    Events.findById(req.params.eventId).then(function (event) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    res.end('POST operation not supported');
}).put(function (req, res, next) {
    Events.findByIdAndUpdate(req.params.eventId, {
        $set: req.body
    }, { new: true }).then(function (event) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).delete(function (req, res, next) {
    Events.findByIdAndRemove(req.params.eventId).then(function (response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

module.exports = eventsRouter;
//# sourceMappingURL=eventsRouter.js.map