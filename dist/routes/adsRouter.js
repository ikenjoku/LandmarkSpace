'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var adsRouter = express.Router();
adsRouter.use(bodyParser.json());

var mongoose = require('mongoose');
var Ads = require('../models/Ads');

adsRouter.route('/').get(function (req, res, next) {
    Ads.find({}).then(function (ad) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ad);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    Ads.create(req.body).then(function (ad) {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(ad);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).put(function (req, res, next) {
    res.statusCode = 403;
    res.end('PUT operation not supported');
}).delete(function (req, res, next) {
    Ads.remove({}).then(function (response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

adsRouter.route('/:adId').get(function (req, res, next) {
    Ads.findById(req.params.adId).then(function (ad) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ad);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).post(function (req, res, next) {
    res.end('POST operation not supported');
}).put(function (req, res, next) {
    Ads.findByIdAndUpdate(req.params.adId, {
        $set: req.body
    }, { new: true }).then(function (ad) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ad);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
}).delete(function (req, res, next) {
    Ads.findByIdAndRemove(req.params.adId).then(function (response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, function (err) {
        return next(err);
    }).catch(function (err) {
        return next(err);
    });
});

module.exports = adsRouter;
//# sourceMappingURL=adsRouter.js.map