const db = require("../config/db");

exports.getLatestContent = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM email_content ORDER BY id DESC LIMIT 1");
    return rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getAllCompanies = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM company");
    return rows;
  } catch (err) {
    throw err;
  }
};


// Save new email content
exports.saveContent = async (title, description) => {
  try {
    const [result] = await db.query(
      "INSERT INTO email_content (title, description) VALUES (?, ?)",
      [title, description]
    );
    return result;
  } catch (err) {
    throw err;
  }
};