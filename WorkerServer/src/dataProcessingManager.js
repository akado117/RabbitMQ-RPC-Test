const processData = require('./processData');
const { queueNames, queueSettings } = require('../config');

function dataProcessingManager(mQ) {
  const driverQueue = mQ.getQueue(queueNames.driverInfo);
  const ssnQueue = mQ.getQueue(queueNames.ssnInfo);
  const driverRecordQueue = mQ.getQueue(queueNames.driverRecordInfo);

  async function consumeDriverQueue(msg) {
    const name = msg.content.toString()
    const ssnData = await processData.processName(name);
    const { uuid, ssn } = ssnData;
    //send to DB

    ssnQueue.sendToQueue(JSON.stringify({
      uuid,
      ssn
    }), queueSettings.ssnSend)
  }

  async function consumeSSNQueue(msg) {
    const queueData = JSON.parse(msg.content.toString())
    const driverRecordData = await processData.processSSN(queueData);

    const { uuid, violations } = driverRecordData;
    //send to DB

    driverRecordQueue.sendToQueue(
      JSON.stringify({
        uuid,
        violations
      }, queueSettings.driverRecordSend)
    )
  }

  async function consumeDriverRecordQueue(msg) {
    const queueData = JSON.parse(msg.content.toString())
    const driverRecordData = await processData.processDrivingRecord(queueData);

    const { uuid, numFelonies } = driverRecordData;

    //send to DB
    console.log(driverRecordData);
  }

  
  driverQueue.consume(consumeDriverQueue, { noAck: true });
  ssnQueue.consume(consumeSSNQueue, { noAck: true });
  driverRecordQueue.consume(consumeDriverRecordQueue, { noAck: true });
}

module.exports = dataProcessingManager;