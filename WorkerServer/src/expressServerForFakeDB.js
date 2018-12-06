// This is to emulate a database, ran out of time so doing a quick easy mock
const express = require('express');
const bodyParser = require('body-parser');
const driverInfoManager = require('./src/driverInfoManager');

const app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));