module.exports = {
  queueNames: {
    driverInfo: 'driver-info-0',
    ssnInfo: 'ssn-info-0',
    driverRecordInfo: 'driver-record-info-0',
  },
  amqpServerInfo: {
    userName: process.env.MQ_USER || 'skwcocfg',
    host: process.env.MQ_HOST || 'wombat.rmq.cloudamqp.com',
    password: process.env.MQ_PASS || 'W1bG-hEHf93sYtBLhTFsNCtZnb5o3pK0',
    vHost: process.env.MQ_VHOST || '/skwcocfg',
  },
}