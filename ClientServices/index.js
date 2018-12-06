const config = require('./config')
const MQConnector = require('../Helpers/MQConnector');
const express = require('express');
const bodyParser = require('body-parser');
const driverInfoManager = require('./src/driverInfoManager');

const app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

const { host, userName, password, vHost } = config.amqpServerInfo;

const mQ = new MQConnector(host, userName, password, vHost, (mQ) => {
  mQ.createQueue(config.queueNames.driverInfo);
});


driverInfoManager(app,mQ);

app.listen(config.port, () => console.log(`ClientServices listening on port ${config.port}!`))