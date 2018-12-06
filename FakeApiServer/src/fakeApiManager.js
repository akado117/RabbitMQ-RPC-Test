const { fakeService, getRandomInt, getSSN } = require('./helpers');
const { fakeUrls } = require('../config');

function fakeApiManager(app) {
  app.post(fakeUrls.ssn, (req, res) => {
    const { uuid, name } = req.body;
    fakeService(res, { uuid, ssn: getSSN() }, 5000)
  })
  app.post(fakeUrls.drivingRecord, (req, res) => {
    const { uuid, ssn } = req.body;
    fakeService(res, { uuid, numTickets: getRandomInt(35), violations: getRandomInt(15) }, 15000)
  })
  app.post(fakeUrls.criminalRecord, (req, res) => {
    const { uuid, volations } = req.body;
    fakeService(res, { uuid, numFelonies: getRandomInt(2) }, 15000)
  })
}

module.exports = fakeApiManager;