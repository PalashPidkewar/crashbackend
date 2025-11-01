const Company = require("../models/companyModel");

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.getAll();
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

// Add company
exports.addCompany = async (req, res) => {
  try {
    const { company_name, email } = req.body;
    const result = await Company.addCompany(company_name, email);
    res.json({ message: "Company added successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add company" });
  }
};




// Delete company by ID
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Company.deleteById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, message: "Company deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
