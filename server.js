// server.js

const express = require('express');
const cors = require('cors');
const cron = require("node-cron"); // <-- Add this
const db = require("../backend/config/db"); // <-- Add this
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');

const blogRoutes = require("./routes/blogRoutes");
require('dotenv').config(); // Load .env variables
const path = require('path');

const newsletterRoutes = require('./routes/newsletterRoutes');
const photoRoutes = require("./routes/galleryphotoRoutes");


const companyRoutes = require("./routes/companyRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const emailRoutes = require("./routes/emailRoutes");
const { sendEmail } = require("./utils/emailService");


const app = express();
app.use('/brochures', express.static(path.join(__dirname, 'public', 'brochures')));


// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes

// serve uploads folder
app.use("/Galleryphoto", express.static(path.join(__dirname, "Galleryphoto")));

app.use('/api/chat', chatRoutes);
app.use('/api', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/blogs", blogRoutes);

// API routes
app.use("/api/photos", photoRoutes);

//company emailsend api
app.use("/api/companies", companyRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/email", emailRoutes);


// Port from .env or default 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});




cron.schedule("0 10 * * *", async () => { // Every day at 10:00 AM
  console.log("🕒 Checking monthly scheduled email...");

  try {
    const [schedule] = await db.query("SELECT * FROM schedule ORDER BY id DESC LIMIT 1");
    if (!schedule.length) return;

    const send_day = schedule[0].send_day;
    const today = new Date().getDate();

    if (today === send_day) {
      const [content] = await db.query("SELECT * FROM email_content ORDER BY id DESC LIMIT 1");
      if (!content.length) return;

      const { title, description } = content[0];
      const [companies] = await db.query("SELECT * FROM company");

      await Promise.all(
        companies.map(c => sendEmail(c.email, title, `<h2>Hello ${c.company_name}</h2><p>${description}</p>`))
      );

      console.log("📧 Monthly emails sent successfully!");
    }
  } catch (err) {
    console.error("Cron email error:", err);
  }
});


// // Cron: check daily 10 AM
// cron.schedule("0 10 * * *", () => {
//   console.log("🕒 Checking monthly scheduled email...");

//   db.query("SELECT * FROM schedule ORDER BY id DESC LIMIT 1", (err, schedule) => {
//     if (err || schedule.length === 0) return;
//     const send_day = schedule[0].send_day;
//     const today = new Date().getDate();

//     if (today === send_day) {
//       db.query("SELECT * FROM email_content ORDER BY id DESC LIMIT 1", (err, content) => {
//         if (err || content.length === 0) return;
//         const { title, description } = content[0];

//         db.query("SELECT * FROM company", (err, companies) => {
//           if (err) return console.error(err);

//           companies.forEach(c => {
//             sendEmail(c.email, title, `<h2>Hello ${c.company_name}</h2><p>${description}</p>`);
//           });
//         });
//       });
//     }
//   });
// });