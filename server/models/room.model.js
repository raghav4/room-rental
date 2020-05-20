const mongoose = require('mongoose');
const moment = require('moment');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const { Booking } = require('./booking.model');

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: Number,
    unique: true,
    required: true,
  },
  roomType: {
    type: String,
    enum: {
      values: ['Single', 'Double', 'Triple'],
      message: 'Rooms can only be of Single, Double, Triple Occupancy.',
    },
    required: true,
  },
  bedCapacity: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  rentPerMonth: {
    type: Number,
    min: 0,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  },
});

roomSchema.methods.newBooking = function (rentalDays) {
  const startTime = moment().format();
  const endTime = moment(startTime).add(rentalDays, 'd').format();
  return { checkInDate: startTime, checkOutDate: endTime };
};

roomSchema.methods.getAvailableRooms = function (filters) {};

roomSchema.methods.getNextBookingSlot = function (rentalDays, booking) {
  const startTime = moment(booking[0].bookingSlot.checkOutDate)
    .add(1, 'd')
    .format();
  const endTime = moment(startTime).add(rentalDays, 'd').format();
  return { checkInDate: startTime, checkOutDate: endTime };
};

const Room = mongoose.model('Room', roomSchema);

const validateAddRoom = (room) => {
  const schema = Joi.object({
    roomNo: Joi.number().label('Room Number').required(),
    roomType: Joi.string()
      .valid('Single', 'Double', 'Triple')
      .label('Room Type')
      .required(),
    bedCapacity: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label('Bed Capacity')
      .required(),
    rentPerMonth: Joi.number()
      .integer()
      .min(0)
      .label('Rent Per Month')
      .required(),
    address: Joi.string().label('Address').required(),
  });

  return schema.validate(room);
};

exports.Room = Room;
exports.validateAdd = validateAddRoom;
