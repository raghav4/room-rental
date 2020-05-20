const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ welcome: 'Welcome to the Room Rental Service' });
});

module.exports = router;
