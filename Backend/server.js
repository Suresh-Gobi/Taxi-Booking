const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const locationRoutes = require("./Routes/Location.routes");
const passengerRoutes = require("./Routes/Passenger.route");
const driverRoutes = require("./Routes/Driver.routes");
const bookRoutes = require("./Routes/Booking.routes");
const paymentRoutes = require("./Routes/Payment.routes");
const adminRoutes = require("./Routes/Admin.routes");
const rateRoutes = require("./Routes/Rating.routes");

const app = express();
app.use(cors({ origin: '*' })); 
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect(
  "mongodb+srv://sureshgobi34:wRSZasnnehz7gj6d@cluster0.c5br0x9.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Body parser middleware
app.use(bodyParser.json());

// Use routes
app.use("/api/location", locationRoutes);
app.use("/api/passenger", passengerRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/booking", bookRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rate", rateRoutes);

// Set up Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");
  // Handle disconnect if needed
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Add MongoDB connected message here
  console.log("Connecting to MongoDB...");
});
