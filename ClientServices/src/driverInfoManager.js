const config = require('../config');

function  driverInfoManager(app, MQ) {
  app.post('/user', async (req, res) => {
    const { name } = req.body;
    const driverQueue = MQ.getQueue(config.queueNames.driverInfo);
    await driverQueue.sendToQueue(name, {
      persistent: false,
      expiration: 30000//ms
      //replyTo: 'eventually we will use this'
    });
    
    res.send('generic sent message');
  })
}

module.exports = driverInfoManager;