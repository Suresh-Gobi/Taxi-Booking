const nodemailer = require('nodemailer');

const SMTP_USER = process.env.SMTP_USER || 'sureshgobi34@gmail.com'; // SMTP email address
const SMTP_PASS = process.env.SMTP_PASS || 'cmdmssbgqzqlfgsx'; // SMTP password

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const BookingConfirm = (emailData) => {
  const { passengerName, email, pickupLocation, dropLocation, pickupTime, driverName, driverNumberPlate } = emailData;

  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: 'Booking Confirmation',
    html: `
      <div>
        <h1>Booking Confirmation</h1>
        <p>Your booking has been confirmed. Here are the details:</p>
        <ul>
          <li>Passenger Name: ${passengerName}</li>
          <li>Pickup Location: ${pickupLocation}</li>
          <li>Drop Location: ${dropLocation}</li>
          <li>Pickup Time: ${pickupTime}</li>
          <li>Driver Name: ${driverName}</li>
          <li>Driver Number Plate: ${driverNumberPlate}</li>
        </ul>
        <p>Thank you for choosing our service!</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { BookingConfirm };
