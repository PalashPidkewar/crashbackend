const db = require('../config/db');

async function createConversation(userId) {
  const [result] = await db.execute(
    'INSERT INTO conversations (user_id, step, last_message) VALUES (?, ?, ?)',
    [userId, 1, '']
  );
  return result.insertId;
}

async function getConversationByUser(userId) {
  const [rows] = await db.execute(
    'SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1',
    [userId]
  );
  return rows[0];
}

async function updateConversation(convoId, fields) {
  const sets = [];
  const values = [];
  for (const key in fields) {
    sets.push(`${key} = ?`);
    values.push(fields[key]);
  }
  if (sets.length === 0) return;
  values.push(convoId);
  const sql = `UPDATE conversations SET ${sets.join(', ')} WHERE id = ?`;
  await db.execute(sql, values);
}

module.exports = {
  createConversation,
  getConversationByUser,
  updateConversation,
};
