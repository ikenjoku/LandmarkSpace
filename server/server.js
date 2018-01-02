const express = require('express');
const path = require('path');
const app = express()
const PORT = process.env.PORT || 4500;
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.static(path.join('client', 'public')));





app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
})