class MQQueue {
  constructor(queueName, channel) {
    const self = this;
    self._queueName = queueName;
    self._ch = channel;
    self._consumerFields;
  }

  //creates new queue -- could create in constructor but easier to put in the hands of users 
  async assertQueue(options = {}) {
    this._assertOptions = options;
    try {
      await this._ch.assertQueue(this._queueName, options);
      self._ok = true;
    } catch(err) {
      self._ok = false;
      console.warn(err)
    }
  }

  checkIfQueueActive() {
    if (!this._ok) {
      console.warn('Please recreate the queue with assertQueue')
      return false
    }
    return true 
  }

  //publishes to queue
  async sendToQueue(data, options = {}) {
    if (!this.checkIfQueueActive()) return false;
    await this._ch.sendToQueue(this._queueName, Buffer.from(data), options);

    //if it doesn't fail, then we return true;
    return true; 
  }

  //remove from queue
  async consume(onConsumeFunction, options = {}) {
    if (!this.checkIfQueueActive()) return false;
    const grabMessageFields = (message) => {
      if (message.fields) this._consumerFields = message.fields;
      return onConsumeFunction(message)
    }
    await this._ch.consume(this._queueName, onConsumeFunction, options);

    return true;
  }

  async cancelConsumer() {
    if (!this._consumerFields) {
      console.warn('Consumer not attached or has received no messages');
      return false;
    }
    await this._ch.cancel(this._consumerFields.consumerTag);

    return true;
  }
}