const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/Booking.controller');

router.post('/book', bookingController.createBooking);

module.exports = router;