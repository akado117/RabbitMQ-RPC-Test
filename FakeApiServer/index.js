const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const fakeApiManager = require('./src/fakeApiManager')

const app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

fakeApiManager(app);

app.listen(config.port, () => console.log(`FakeApiServer listening on port ${config.port}!`))