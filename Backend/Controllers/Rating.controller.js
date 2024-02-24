const jwt = require('jsonwebtoken');
const Rating = require('../Models/Rating.model');

exports.createRating = async (req, res) => {
  try {
    const { rating, description } = req.body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }

    // Create a new rating
    const newRating = new Rating({
      rating,
      description,
    });

    // Save the rating to the database
    await newRating.save();

    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};