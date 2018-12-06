const fakeServerConfig = require('../FakeApiServer/config');
const { amqpServerInfo, queueNames } = require('../config');

module.exports = {
  port: 3002,
  dataServerHost: `http://localhost:${fakeServerConfig.port}`,
  amqpServerInfo: {
    userName: process.env.MQ_USER || amqpServerInfo.userName,
    host: process.env.MQ_HOST || amqpServerInfo.host,
    password: process.env.MQ_PASS || amqpServerInfo.password,
    vHost: process.env.MQ_VHOST || amqpServerInfo.vHost,
  },
  queueNames: {
    driverInfo: process.env.MQ_DRIVER_INFO || queueNames.driverInfo,
    ssnInfo: process.env.MQ_SSN_INFO || queueNames.ssnInfo,
    driverRecordInfo: process.env.MQ_DRIVER_RECORD_INFO || queueNames.driverRecordInfo,
  },
  queueSettings: {
    ssnSend: {
      persistent: false,
      expiration: 25000//ms
    },
    driverRecordSend: {
      persistent: false,
      expiration: 25000//ms
    }
  }
}