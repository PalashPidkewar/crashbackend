const db = require('../db');

exports.insertEmail = async (email) => {
  const [result] = await db.promise().query(
    'INSERT INTO newsletter_emails (email) VALUES (?)',
    [email]
  );
  return result;
};
