const axios = require('axios');
const { dataServerHost } = require('../config');
const { fakeUrls } = require('../../FakeApiServer/config');
const dataWarehouse = require('./dataWarehouse');

//logging is just for reference. This is POC code/not production
async function processName(driverData) {
  console.log('Processing name data for: ', driverData)

  dataWarehouse.saveUser(driverData)

  const response = await axios.post(`${dataServerHost}${fakeUrls.ssn}`, driverData)

  dataWarehouse.saveUser(response.data)

  console.log(response.data);

  return response.data;// { uuid, ssn }
}

async function processSSN(ssnData) {
  console.log('Processing ssn data for: ', ssnData)
  const { uuid, ssn } = ssnData;
  const response = await axios.post(`${dataServerHost}${fakeUrls.drivingRecord}`, {
    uuid,
    ssn
  })

  dataWarehouse.saveUser(response.data)

  return response.data; // { uuid, numTickets, volations }
}

async function processDrivingRecord(drivingRecordData) {
  console.log('Processing driving record data for: ', drivingRecordData);
  const { uuid, violations } = drivingRecordData;
  const response = await axios.post(`${dataServerHost}${fakeUrls.criminalRecord}`, {
    uuid,
    violations
  })

  dataWarehouse.saveUser(response.data)

  return response.data; // { uuid, numFelonies }
}

module.exports = {
  processName,
  processSSN,
  processDrivingRecord,
}