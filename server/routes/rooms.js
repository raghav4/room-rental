const express = require('express');
// const auth = require('../middlewares/auth');
const roomController = require('../controllers/room.controller');

const router = express.Router();

// Route to add a new Room,
router.post('/new', roomController.addNewRoom);

module.exports = router;
