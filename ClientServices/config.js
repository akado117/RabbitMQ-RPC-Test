const parentConfig = require('../config');
const { amqpServerInfo, queueNames } = parentConfig

const configData = {
  port: process.env.PORT = 3001,
  amqpServerInfo: {
    userName: process.env.MQ_USER || amqpServerInfo.userName,
    host: process.env.MQ_HOST || amqpServerInfo.host,
    password: process.env.MQ_PASS || amqpServerInfo.password,
    vHost: process.env.MQ_VHOST || amqpServerInfo.vHost,
  },
  queueNames: {
    driverInfo: process.env.MQ_DRIVER_INFO || queueNames.driverInfo
  }
}

module.exports = configData;