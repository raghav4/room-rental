const { Room, validateAdd } = require('../models/room.model');
const { Booking, validateBook } = require('../models/booking.model');
const { User } = require('../models/user.model');

// Controller to add a new room
exports.addNewRoom = async (req, res) => {
  const { error } = validateAdd(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { roomNo, roomType, bedCapacity, rentPerMonth, address } = req.body;

  // If a room with a given room number already exists return res with 409,
  let room = await Room.findOne({ roomNo });
  if (room) {
    return res
      .status(409)
      .send('A room already exists with the given Room Number');
  }

  room = new Room({
    roomNo,
    roomType,
    bedCapacity,
    rentPerMonth,
    address,
  });
  await room.save();

  return res.status(200).send(room);
};

exports.bookRoom = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { roomId, userId, rentalDays } = req.body;

  // Check if the room with the given id exists or not,
  const room = await Room.findById(roomId);
  if (!room) return res.status(400).send('Room with the given ID doesnt exist');
  // Check if the user exists with the given ID
  const user = await User.findById(userId);
  if (!user) return res.status(400).send('User with the given ID doesnt exist');

  // Get the existing Booking of the Room,
  // returns an array of bookings
  const existingBookings = await Booking.findOne({ roomId });

  const { checkInDate, checkOutDate } = Room.getNextBookingSlot(
    rentalDays,
    existingBookings,
  );

  const newBooking = new Booking({
    roomId,
    userId,
    bookingSlot: { checkInDate, checkOutDate },
  });

  const response = {};
};
