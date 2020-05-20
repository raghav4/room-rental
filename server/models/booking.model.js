const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingSlot: {
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

const validateBooking = (room) => {
  const schema = Joi.object({
    roomId: Joi.objectId().label('Room ID').required(),
    userId: Joi.objectId().label('User ID').required(),
    rentalDays: Joi.number()
      .integer()
      .min(1)
      .label('Rental Days')
      .required(),
  });
  return schema.validate(room);
};

exports.Booking = Booking;
exports.validateBooking = validateBooking;
