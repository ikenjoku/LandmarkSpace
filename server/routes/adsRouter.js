const express = require('express');
const bodyParser = require('body-parser');
const adsRouter = express.Router();
adsRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Ads = require('../models/Ads');

adsRouter.route('/')
    .get((req, res, next) => {
        Ads.find({})
            .then((ad) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ad)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Ads.create(req.body)
            .then((ad) => {
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(ad)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        Ads.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err))
    });


adsRouter.route('/:adId')
    .get((req, res, next) => {
        Ads.findById(req.params.adId)
            .then((ad) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ad);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        Ads.findByIdAndUpdate(req.params.adId, {
                $set: req.body,
            }, { new: true })
            .then((ad) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ad);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Ads.findByIdAndRemove(req.params.adId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = adsRouter;