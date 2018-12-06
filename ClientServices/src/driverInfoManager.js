const axios = require('axios');
const config = require('../config');

function  driverInfoManager(app, MQ) {
  app.get('/user', async (req, res) => {
    //below is for non db data so not using config and isn't very clean since it needs a refactor
    let uuid = ''
    if (req.query && req.query.uuid) uuid = req.query.uuid

    const response = await axios.get(`http://localhost:3010/users${uuid ? `?uuid=${uuid}` : ''}`);
    const data = response.data;

    const resBody = {
      uuid: req.query.uuid,
      message: `successfully triggered get data for`,
      data
    }

    //if has felonies then its complete and we can stop
    if (uuid && data[uuid] && data[uuid].hasOwnProperty('numFelonies')) resBody.isFinished = true;

    res.send(JSON.stringify(resBody));
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