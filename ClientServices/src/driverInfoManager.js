const config = require('../config');


function  driverInfoManager(app, MQ) {
  app.get('/user', async (req, res) => {
    res.send(JSON.stringify({
      uuid: req.query.uuid,
      message: `successfully triggered get data for`,
    }));
  })
  app.post('/user', async (req, res) => {
    const { name } = req.body;
    const uuid = Math.floor(Math.random() * 100000000 + Date.now());

    const driverQueue = MQ.getQueue(config.queueNames.driverInfo);
    await driverQueue.sendToQueue(JSON.stringify({
      uuid,
      name
    }), {
      persistent: false,
      expiration: 30000//ms
    });
    
    res.send(JSON.stringify({
      status: 200,
      data: {
        name,
        uuid
      },
      message: `successfully triggered get data for ${name}`,
    }));
  })
}

module.exports = driverInfoManager;