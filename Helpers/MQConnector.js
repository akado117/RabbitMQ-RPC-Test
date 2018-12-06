const amqp = require('amqplib');
const MQQueue = require('./MQQueue');

class MQConnector {
  constructor(host, name, password, vHost, cb = () => {}) {
    const self = this;
    const connectorURL = host ? `amqp://${name}:${password}@${host}${vHost}` : 'amqp://localhost'
    
    amqp.connect(connectorURL).then(function(conn) {
      self._connector = conn;
      cb(self);
    }).catch(console.warn);
    self._queues = {};
  }

  async createQueue(queueId, assertQueueOptions = {}, optionalQueueName) {
    let queue;
    try {
      const channel = await this._connector.createChannel();

      queue = new MQQueue(optionalQueueName || queueId, channel);
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