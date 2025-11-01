const { getLatestContent,saveContent , getAllCompanies } = require("../models/emailModel");
const { sendEmail } = require("../utils/emailService");

exports.sendEmailNow = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title & description required" });

    const companies = await getAllCompanies();
    for (let c of companies) {
      await sendEmail(c.email, title, `<h2>Hello ${c.company_name}</h2><p>${description}</p>`);
    }

    res.json({ message: "Emails sent successfully!" });
  } catch (err) {
    console.error("SendNow Error:", err);
    res.status(500).json({ error: "Failed to send emails" });
  }
};


exports.saveEmailContent = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title & description required" });

    await saveContent(title, description);
    res.json({ message: "Email content saved successfully!" });
  } catch (err) {
    console.error("SaveContent Error:", err);
    res.status(500).json({ error: "Failed to save email content" });
  }
};