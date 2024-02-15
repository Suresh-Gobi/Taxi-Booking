const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  distance: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  dropLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending",
  },
  passenger: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
