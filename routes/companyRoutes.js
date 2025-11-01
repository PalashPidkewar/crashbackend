const express = require("express");
const router = express.Router();
const { getAllCompanies, addCompany  ,deleteCompany} = require("../controllers/companyController");

router.get("/", getAllCompanies);
router.post("/", addCompany);
router.delete("/:id", deleteCompany);
module.exports = router;



// DELETE company by ID
