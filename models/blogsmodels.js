const db = require("../config/db");

class Blog {
  // ✅ Create a new blog
  static async create({ title, content, imageUrl, author, tags }) {
    const [result] = await db.execute(
      "INSERT INTO blogs (title, content, imageUrl, author, tags) VALUES (?, ?, ?, ?, ?)",
      [title, content, imageUrl, author, tags]
    );
    return result;
  }

  // ✅ Get all blogs (latest first)
  static async findAll() {
    const [rows] = await db.execute(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    return rows;
  }

  // ✅ Get single blog by ID
  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM blogs WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // ✅ Update a blog by ID
  static async update(id, { title, content, imageUrl, author, tags }) {
    const [result] = await db.execute(
      "UPDATE blogs SET title=?, content=?, imageUrl=?, author=?, tags=? WHERE id=?",
      [title, content, imageUrl, author, tags, id]
    );
    return result;
  }

  // ✅ Delete a blog by ID
  static async delete(id) {
    const [result] = await db.execute(
      "DELETE FROM blogs WHERE id=?",
      [id]
    );
    return result;
  }
}

module.exports = Blog;
