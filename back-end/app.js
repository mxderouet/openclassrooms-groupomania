require('dotenv').config()

const express = require('express');
const logger = require('morgan');
// const userRoutes = require('./routes/user');
// const path = require('path');


const app = express();

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


// app.use('/api/auth', userRoutes);

module.exports = app;
