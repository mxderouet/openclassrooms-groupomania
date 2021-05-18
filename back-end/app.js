require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
});

const app = express();

// protection against HTTP headers vulnerabilities
app.use(helmet());

// apply to all requests
app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

var models = require('./models');

models.sequelize.sync().then(function() {
    console.log('database synchronized');
}).catch(function(err) {
    console.log(err, 'An error has occured while sync the DB')
});

require('./routes')(app);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
