const nodemailer = require("nodemailer");

// Use env variables for credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // e.g., pidkewargo@gmail.com
    pass: process.env.SMTP_PASS, // App password from Gmail
  },
});

exports.sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Email sending error:", err);
  }
};
