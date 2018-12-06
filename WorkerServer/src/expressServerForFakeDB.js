// This is to emulate a database, ran out of time so doing a quick easy mock
const express = require('express');
const bodyParser = require('body-parser');
const dataWarehouse = require('./dataWarehouse');

const app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/users', (req, res) => {
  users = dataWarehouse.getUsers();
  res.send(JSON.stringify(users))
})

app.listen(3010, () => console.log(`Fake Database listening on port 3010!`))