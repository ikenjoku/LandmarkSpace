const express = require('express');
const app = express()
const path = require('path');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const PORT = process.env.PORT || 4500;
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const adsRouter = require('./routes/adsRouter');
const postsRouter = require('./routes/postsRouter');
const buzzesRouter = require('./routes/buzzesRouter')
const eventsRouter = require('./routes/eventsRouter');

app.use(logger('dev'));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connect = mongoose.connect(keys.mongoURI);
connect.then((db) => {
    console.log('Connected freshly to MongoDB!');
}, (err) => { console.log(err); });

app.use('/ads', adsRouter);
app.use('/posts', postsRouter);
app.use('/events', eventsRouter);
app.use('/buzzes', buzzesRouter);
app.use(express.static(path.join('client', 'public')));


app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log(err.message);
    res.status(status).send(err.message);
});

app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});