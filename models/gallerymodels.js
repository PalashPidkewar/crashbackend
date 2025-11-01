const db = require("../config/db");

const galleryphoto = {
  add: async (title, filename, date) => {
    const sql = "INSERT INTO photos (title, filename, date) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [title, filename, date]);
    return result;
  },

  getAll: async () => {
    const sql = "SELECT * FROM photos ORDER BY id DESC";
    const [rows] = await db.query(sql);
    return rows;
  },

  getById: async (id) => {
    const sql = "SELECT * FROM photos WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  deleteById: async (id) => {
    const sql = "DELETE FROM photos WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result;
  }
};

module.exports = galleryphoto;
