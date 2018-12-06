const config = require('../config');

function  driverInfoManager(app, MQ) {
  app.get('/user', async () => {
    //heartbeat code from DB;
  })
  app.post('/user', async (req, res) => {
    const { name } = req.body;
    const driverQueue = MQ.getQueue(config.queueNames.driverInfo);
    await driverQueue.sendToQueue(name, {
      persistent: false,
      expiration: 30000//ms
    });
    
    res.send('generic sent message');
  })
}

module.exports = driverInfoManager;