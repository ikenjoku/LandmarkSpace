const express = require('express');
const bodyParser = require('body-parser');
const eventsRouter = express.Router();
eventsRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Events = require('../models/Events');

eventsRouter.route('/')
    .get((req, res, next) => {
        Events.find({})
            .then((events) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(events)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Events.create(req.body)
            .then((event) => {
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(event)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        Events.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

eventsRouter.route('/:eventId')
    .get((req, res, next) => {
        Events.findById(req.params.eventId)
            .then((event) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(event);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        Events.findByIdAndUpdate(req.params.eventId, {
                $set: req.body,
            }, { new: true })
            .then((event) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(event);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Events.findByIdAndRemove(req.params.eventId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = eventsRouter;