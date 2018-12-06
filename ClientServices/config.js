const parentConfig = require('./config');

const configData = {
  port: process.env.PORT = 3001,
  amqpServerInfo: {
    userName: process.env.MQ_USER || 'skwcocfg',
    host: process.env.MQ_HOST || 'wombat.rmq.cloudamqp.com',
    password: process.env.MQ_PASS || 'W1bG-hEHf93sYtBLhTFsNCtZnb5o3pK0',
    vHost: process.env.MQ_VHOST || '/skwcocfg',
  },
  queueNames: {
    driverInfo: process.env.MQ_DRIVER_INFO || parentConfig.driverInfo
  }
}

module.exports = configData;