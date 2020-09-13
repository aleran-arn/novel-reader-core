const mongoose = require('mongoose');
const dbConf = require('./config/db');

const options = {useNewUrlParser: true, useUnifiedTopology: true};
const connection = mongoose.createConnection(dbConf.url, options);

module.exports.dbConnection =  connection;