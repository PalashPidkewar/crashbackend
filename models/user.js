const db = require('../config/db');

async function createUser({ name, email, phone }) {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );
  return result.insertId;
}

async function updateUser(userId, fields) {
  const sets = [];
  const values = [];
  for (const key in fields) {
    sets.push(`${key} = ?`);
    values.push(fields[key]);
  }
  if (sets.length === 0) return;
  values.push(userId);
  const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = ?`;
  await db.execute(sql, values);
}

async function getUserById(userId) {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
  return rows[0];
}

async function getAllUsers() {
  const [rows] = await db.execute('SELECT * FROM users');
  return rows;
}


// ✅ Delete all users (truncate the table)




async function deleteAllUsers() {
  // First, delete all related conversations
  await db.execute('DELETE FROM conversations');
  
  // Then safely delete users
  await db.execute('DELETE FROM users');
}


module.exports = {
  createUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteAllUsers,
};
