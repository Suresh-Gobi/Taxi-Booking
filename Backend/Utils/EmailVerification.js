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

const sendVerificationEmail = (email, username, password) => {
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: 'Email Verification',
    html: `
      <div>
        <h1>Email Verification</h1>
        <p>Your account has been created successfully.</p>
        <p>In order to complete your registration, please verify your email address by clicking the button below:</p>
        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
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

module.exports = { sendVerificationEmail };
