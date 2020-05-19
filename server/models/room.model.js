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
    required: true,
  },
  bedCapacity: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  rentPerMonth: {
    type: Number,
    min: 100,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    booked: {
      type: Boolean,
      default: false,
    },
  },
});

roomSchema.methods.getAvailableRooms = function (filters) {};

roomSchema.methods.getNextBookingSlot = function (rentalDays, booking) {
  if (!booking) {
    const startTime = moment().format();
    const endTime = moment(startTime).add(rentalDays, 'd').format();
    return { checkInDate: startTime, checkOutDate: endTime };
  }
  const lastBooking = booking.bookingSlot[booking.bookingSlot.length - 1];
  const startTime = moment(lastBooking.checkOutDate).add(1, 'd').format();
  const endTime = moment(startTime).add(rentalDays, 'd').format();

  return { checkInDate: startTime, checkOutDate: endTime };
};

const Room = mongoose.model('Room', roomSchema);

const validateAddRoom = (room) => {
  const schema = Joi.object({
    roomNo: Joi.number().label('Room Number').required(),
    roomType: Joi.string().label('Room Type').required(),
    bedCapacity: Joi.number()
      .integer()
      .min(0)
      .max(10)
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
