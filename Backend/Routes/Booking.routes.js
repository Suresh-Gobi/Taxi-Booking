const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/Booking.controller");
const unregbookingController = require("../Controllers/UnRegistered.controller");

router.post("/book", bookingController.createBooking);
router.get("/dbooking", bookingController.showBooking);
router.put("/updatebooking", bookingController.acceptBooking);
router.put("/completebooking", bookingController.completeBooking);
router.get("/bookingstatus", bookingController.showPendingBookings);

//Un-Registered Passengers
router.post(
  "/unreg",
  unregbookingController.createUnRegisteredRecord
);

module.exports = router;
