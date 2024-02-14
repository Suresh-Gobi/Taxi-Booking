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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passenger",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
});

// Indexes for geospatial queries
bookingSchema.index({ pickupLocation: "2dsphere" });
bookingSchema.index({ dropLocation: "2dsphere" });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
