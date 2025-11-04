const nodemailer = require("nodemailer");

// Configure Nodemailer transport for Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: "adeelshahsyes@gmail.com", // your Gmail
    pass: "rbhu evai xmlr elza",     // Gmail App Password
  },
});

// Reusable SendMail function
module.exports  = SendMail = async (to, subject, message, recipientName) => {
  const mailOptions = {
    from: '"My Shop" <adeelshahsyes@gmail.com>', // sender
    to,                                           // recipient
    subject,                                      // email subject
    html: `
      <h2>Hello ${recipientName}!</h2>
      <p>${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// Example usage:

