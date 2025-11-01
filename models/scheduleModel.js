const db = require("../config/db");

// Get schedule
exports.getDay = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM schedule ORDER BY id DESC LIMIT 1");
    return rows[0];
  } catch (err) {
    throw err;
  }
};

// Set schedule
exports.setDay = async (send_day) => {
  try {
    const [result] = await db.query("INSERT INTO schedule (send_day) VALUES (?)", [send_day]);
    return result;
  } catch (err) {
    throw err;
  }
};
