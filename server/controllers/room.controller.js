const _ = require('lodash');
const moment = require('moment');
const { Room } = require('../models/room.model');
const { Booking } = require('../models/booking.model');
const { User } = require('../models/user.model');

exports.addNewRoom = async (req, res) => {
  const {
    roomNo,
    roomType,
    bedCapacity,
    rentPerMonth,
    address,
  } = req.body;

  let room = await Room.findOne({ roomNo });
  if (room) {
    return res
      .status(409)
      .send('A room already exists with the given Room Number');
  }
  try {
    room = new Room({
      roomNo,
      roomType,
      bedCapacity,
      rentPerMonth,
      address,
    });

    await room.save(room);

    return res
      .status(200)
      .send(
        _.pick(room, [
          '_id',
          'roomNo',
          'roomType',
          'bedCapacity',
          'rentPerMonth',
          'address',
        ]),
      );
  } catch (ex) {
    return res
      .status(400)
      .send(`${ex.errors.roomType.name} : ${ex.errors.roomType.message}`);
  }
};

exports.deleteRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return res.status(400).send('Room with the given ID doesnt exist');
  }
  if (room.status.bookings.length) {
    return res
      .status(403)
      .send('Cannot delete the room as its already been booked');
  }
  await room.remove();
  return res.status(200).send('Successfully deleted the room');
};

exports.updateRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return res.status(404).send('Room with the given ID does not exist');
  }
  if (room.status.bookings.length) {
    return res
      .status(403)
      .send('Cannot update the room as its already been booked');
  }

  const {
    roomNo,
    roomType,
    bedCapacity,
    rentPerMonth,
    address,
  } = req.body;

  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    {
      roomNo: roomNo || room.roomNo,
      roomType: roomType || room.roomType,
      bedCapacity: bedCapacity || room.bedCapacity,
      rentPerMonth: rentPerMonth || room.rentPerMonth,
      address: address || room.address,
    },
    { new: true },
  );
  updatedRoom.status = _.omit(updatedRoom.status, ['bookings']);
  return res.status(200).send(updatedRoom);
};

exports.bookRoom = async (req, res) => {
  const { roomId, userId, rentalDays } = req.body;

  // Check if the room with the given id exists or not,
  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(400).send('Room with the given ID doesnt exist');
  }
  // Check if the user exists with the given ID
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send('User with the given ID doesnt exist');
  }

  // Get the existing Booking of the Room,
  // returns an array of bookings
  const existingBookings = await Booking.find({ roomId }).sort({
    'bookingSlot.checkOutDate': 'desc',
  });

  // If the room has not been booked yet, create a new booking,
  // and return

  if (!existingBookings.length) {
    const bookingSlot = room.newBooking(rentalDays);

    try {
      let userBooking = new Booking({
        roomId,
        userId,
        bookingSlot,
      });
      userBooking = await userBooking.save();

      await Room.findByIdAndUpdate(
        roomId,
        {
          $push: { 'status.bookings': userBooking._id },
        },
        { new: true },
      );
      return res.status(200).send(userBooking);
    } catch (ex) {
      return res.status(500).send(ex.errors);
    }
  } else {
    const bookingSlot = room.getNextBookingSlot(
      rentalDays,
      existingBookings,
    );
    try {
      let userBooking = new Booking({
        roomId,
        userId,
        bookingSlot,
      });
      userBooking = await userBooking.save();

      await Room.findByIdAndUpdate(
        roomId,
        {
          $push: { 'status.bookings': userBooking._id },
        },
        { new: true },
      );
      return res.status(200).send(userBooking);
    } catch (ex) {
      return res.status(500).send(ex.errors);
    }
  }
};

exports.roomStatus = async (req, res) => {
  const room = await Room.findById(req.params.id).populate(
    'status.bookings',
  );
  if (!room) {
    return res.status(404).send('Room with the given id not found');
  }

  return res.status(200).send(room);
};

exports.viewRoomFilter = async (req, res) => {
  const filter = {
    beds: req.body.beds || 0,
    date: req.body.date || moment().format(),
  };
  const rooms = await Room.find().and([
    { bedCapacity: { $gte: filter.beds } },
    { 'status.bookings.bookingSlot.checkOutDate': { $gt: filter.date } },
  ]);
  if (!rooms) {
    return res.status(404).send('No rooms found with the filters');
  }
  return res.status(200).send(rooms);
};
