const db = require("../config/db"); // mysql2/promise pool

// Get all companies
exports.getAll = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM company");
    return rows;
  } catch (err) {
    throw err;
  }
};

// Add a company
exports.addCompany = async (company_name, email) => {
  try {
    const [result] = await db.query(
      "INSERT INTO company (company_name, email) VALUES (?, ?)",
      [company_name, email]
    );
    return result;
  } catch (err) {
    throw err;
  }
};


// Delete company by ID
exports.deleteById = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM company WHERE id = ?", [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

