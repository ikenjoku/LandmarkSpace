const express = require('express');
const bodyParser = require('body-parser');
const buzzesRouter = express.Router();
buzzesRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Buzzes = require('../models/Buzzes');

buzzesRouter.route('/')
    .get((req, res, next) => {
        Buzzes.find({})
            .then((buzzes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(buzzes)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Buzzes.create(req.body)
            .then((buzz) => {
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(buzz)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        Buzzes.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

buzzesRouter.route('/:buzzId')
    .get((req, res, next) => {
        Buzzes.findById(req.params.buzzId)
            .then((buzz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(buzz);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        Buzzes.findByIdAndUpdate(req.params.buzzId, {
                $set: req.body,
            }, { new: true })
            .then((buzz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(buzz);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Buzzes.findByIdAndRemove(req.params.buzzId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = buzzesRouter;