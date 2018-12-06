const amqp = require('amqplib');
const MQQueue = require('./MQQueue');

class MQConnector {
  constructor(host, name, password, cb = () => {}) {
    const self = this;
    connectorURL = host ? `amqp://${name}:${password}@${host}` : 'amqp://localhost'
    
    amqp.connect(connectorURL).then(function(err, conn) {
      self = conn;
      cb();
    }).catch(console.warn);
    self._queues = {};
  }

  async createQueue(queueId, assertQueueOptions = {}, optionalQueueName) {
    
    try {
      const channel = await conn.createChannel();

      const queue = new MQQueue(optionalQueueName || queueId, channel);
      await queue.assertQueue(assertQueueOptions);
    } catch (error) {
      console.warn(error);
    }

    this._queues[queueId] = queue;
  }

  getQueue(queueId) {
    return this._queues[queueId];
  }
  getChannelIds() {
    return Object.keys(this._queues);
  }
}

module.exports = MQConnector;