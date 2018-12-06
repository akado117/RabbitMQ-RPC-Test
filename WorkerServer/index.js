const MQConnector = require('../Helpers/MQConnector');
const config = require('../config')
const dataProcessingManager = require('./src/dataProcessingManager')
const fakeDatabaseService = require('./src/expressServerForFakeDB');

const { host, userName, password, vHost } = config.amqpServerInfo;

new MQConnector(host, userName, password, vHost, async (mQ) => {
  try {
    const dIPromise = mQ.createQueue(config.queueNames.driverInfo);
    const ssnIPromise = mQ.createQueue(config.queueNames.ssnInfo);
    const dRIPromise = mQ.createQueue(config.queueNames.driverRecordInfo);

    await Promise.all([dIPromise, ssnIPromise, dRIPromise]);
    dataProcessingManager(mQ);
    console.log('Worker server is active');
  } catch(err) {
    console.error(err);
  }
});