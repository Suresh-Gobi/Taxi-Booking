const Location = require("../Models/Location.model");

exports.createLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    let location = await Location.findOne();

    if (location) {
      // If location exists, update it
      location.latitude = latitude;
      location.longitude = longitude;
    } else {
      // If location doesn't exist, create a new one
      location = new Location({ latitude, longitude });
    }

    // Save the location
    await location.save();

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    const existingLocation = await Location.findOne({ userId });
    if (existingLocation) {
      existingLocation.latitude = latitude;
      existingLocation.longitude = longitude;
      await existingLocation.save();
      res.status(200).json(existingLocation);
    } else {
      const newLocation = new Location({ userId, latitude, longitude });
      const savedLocation = await newLocation.save();
      res.status(201).json(savedLocation);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
