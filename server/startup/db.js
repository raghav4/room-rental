require('dotenv').config();
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
  const dbURI = process.env.DB_URI;
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(() => console.log('Failed to connect to MongoDB..'));
};
