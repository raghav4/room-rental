const cors = require('cors');
const bodyParser = require('body-parser');
const error = require('../middlewares/error');
const rooms = require('../routes/rooms');
const user = require('../routes/users');
const welcome = require('../routes/welcome');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      exposedHeaders: ['Content-Length', 'x-auth-token'],
    }),
  );
  app.use('/rooms', rooms);
  app.use('/user', user);
  app.use('/', welcome);
  app.use(error);
};
