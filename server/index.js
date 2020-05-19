require('dotenv').config();
const express = require('express');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.jwtPrivateKey) {
  console.log('jwtPrivateKey is not defined');
  process.exit(1);
}

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});

module.exports = server;
