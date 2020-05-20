const express = require('express');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');
const validateObjectId = require('../middlewares/validateObjectId');
const { validateAdd } = require('../models/room.model');
const { validateBooking } = require('../models/booking.model');
const roomController = require('../controllers/room.controller');

const router = express.Router();

// Route to get the status of a room
router.get(
  '/status/:id',
  [auth, validateObjectId],
  roomController.roomStatus,
);

// Route to add a new Room,
router.post(
  '/new',
  [auth, validator(validateAdd)],
  roomController.addNewRoom,
);

// Route to delete a room,
router.delete(
  '/delete/:id',
  [auth, validateObjectId],
  roomController.deleteRoom,
);

// Route to update a new room,
router.put(
  '/:id',
  [auth, validateObjectId, validator(validateAdd)],
  roomController.updateRoom,
);

// Route to book a room,
router.post('/book', validator(validateBooking), roomController.bookRoom);

// View rooms with filter,
router.get('/filters', roomController.viewRoomFilter);

module.exports = router;
