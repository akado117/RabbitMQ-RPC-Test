const { fakeService, getRandomInt, getSSN } = require('./helpers');

function fakeApiManager(app) {
  app.post('/ssn', (req, res) => {
    const { uuid, name } = req.body;
    fakeService(res, { uuid, ssn: getSSN() }, 5000)
  })
  app.post('/drivingRecord', (req, res) => {
    const { uuid, ssn } = req.body;
    fakeService(res, { uuid, numTickets: getRandomInt(35), volations: getRandomInt(15) }, 15000)
  })
  app.post('/criminalRecord', (req, res) => {
    const { uuid, volations } = req.body;
    fakeService(res, { uuid, numFelonies: getRandomInt(2) }, 15000)
  })
}

module.exports = fakeApiManager;