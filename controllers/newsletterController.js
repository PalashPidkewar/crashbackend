// const db = require('../config/db');

// exports.subscribeNewsletter = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//     await db.query('INSERT INTO newsletter_emails (email) VALUES (?)', [email]);
//     return res.status(200).json({ message: '✅ Email subscribed successfully!' });
//   } catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       return res.status(409).json({ error: '⚠️ This email is already subscribed.' });
//     }

//     return res.status(500).json({ error: '❌ Server error. Please try again later.' });
//   }
// };



const db = require('../config/db');
const { sendSubscriptionEmail ,sendNewsletterToSubscribers } = require('../utils/sendEmail');

exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await db.query('INSERT INTO newsletter_emails (email) VALUES (?)', [email]);

    // ✅ Send confirmation email with PDF
    await sendSubscriptionEmail(email);

    return res.status(200).json({ message: '✅ Email subscribed successfully and confirmation sent!' });
  } catch (err) {
    console.error('Error subscribing newsletter:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: '⚠️ This email is already subscribed.' });
    }

    return res.status(500).json({ error: '❌ Server error. Please try again later.' });
  }
};



// ✅ GET — fetch all subscribed emails
exports.getAllSubscribers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM newsletter_emails ORDER BY id DESC');
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    return res.status(500).json({ error: '❌ Failed to fetch subscribers. Please try again later.' });
  }
};



// ✅ Send newsletter to all subscribers
exports.sendNewsletterToAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT email FROM newsletter_emails');
    const emails = rows.map(row => row.email);

    if (emails.length === 0) {
      return res.status(404).json({ error: '⚠️ No subscribers found.' });
    }

    await sendNewsletterToSubscribers(emails);

    return res.status(200).json({ message: `✅ Newsletter sent to ${emails.length} subscribers!` });
  } catch (err) {
    console.error('Error sending newsletter:', err);
    return res.status(500).json({ error: '❌ Failed to send newsletter. Please try again later.' });
  }
};