'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var path = require('path');
var logger = require('morgan');
var errorhandler = require('errorhandler');
var PORT = process.env.PORT || 4500;
var bodyParser = require('body-parser');
var keys = require('./config/keys');

_sourceMapSupport2.default.install();

var adsRouter = require('./routes/adsRouter');
var postsRouter = require('./routes/postsRouter');
var buzzesRouter = require('./routes/buzzesRouter');
var eventsRouter = require('./routes/eventsRouter');

app.use(logger('dev'));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connect = mongoose.connect(keys.mongoURI);

app.use('/api/v1/ads', adsRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/buzzes', buzzesRouter);
app.use(_express2.default.static(path.join('client', 'public')));

app.use(function (err, req, res, next) {
    var status = err.status || 500;
    console.log(err.message);
    res.status(status).send(err.message);
});

connect.then(function (db) {
    console.log('Connected freshly to MongoDB!');
    app.listen(PORT, function () {
        console.log('Server is up and running at ' + PORT);
    });
}, function (err) {
    console.log(err);
});
//# sourceMappingURL=server.js.map