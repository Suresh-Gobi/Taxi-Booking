const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/Booking.controller');
const unregbookingController = require('../Controllers/UnRegistered.controller');

router.post('/book', bookingController.createBooking);
router.get('/dbooking', bookingController.showBooking);
router.put('/updatebooking', bookingController.acceptBooking);
router.put('/completebooking', bookingController.completeBooking);

//Un-Registered Passengers
router.post('/completebooking', unregbookingController.createUnRegisteredRecord);

module.exports = router;