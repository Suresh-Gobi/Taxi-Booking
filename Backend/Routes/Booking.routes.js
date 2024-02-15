const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/Booking.controller');

router.post('/book', bookingController.createBooking);
router.get('/dbooking', bookingController.showBooking);

module.exports = router;