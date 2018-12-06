const axios = require('axios');
const { dataServerHost } = require('../config');
const { fakeUrls } = require('../../FakeApiServer/config');

//logging is just for reference. This is POC code/not production
async function processName(name) {
  console.log('Processing name data for: ', name)
  const uuid = Math.floor(Math.random() * 100000000);
  const response = await axios.post(`${dataServerHost}${fakeUrls.ssn}`, {
    uuid,
    name
  })

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

  return response.data; // { uuid, numTickets, volations }
}

async function processDrivingRecord(drivingRecordData) {
  console.log('Processing driving record data for: ', drivingRecordData);
  const { uuid, violations } = drivingRecordData;
  const response = await axios.post(`${dataServerHost}${fakeUrls.criminalRecord}`, {
    uuid,
    violations
  })

  return response.data; // { uuid, numFelonies }
}

module.exports = {
  processName,
  processSSN,
  processDrivingRecord,
}