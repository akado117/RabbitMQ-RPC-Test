function fakeService(res, returnData, delay) {
  //simulate calling external services
  this.setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(returnData));
  }, Math.random() * delay);
}

function getRandomInt(maxSize) {
  const limit = maxSize + 1;

  return Math.floor(Math.random() * limit);
}

function getSSN() {
  let ssn = ''
  for (let a = 0; a < 9; a++) {
    const number = getRandomInt(9);
    if (a === 3 || a === 5) ssn += '-'
    ssn += number;
  }
  return ssn;
}

module.exports = {
  getSSN,
  getRandomInt,
  fakeService,
}