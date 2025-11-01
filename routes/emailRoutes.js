const express = require("express");
const router = express.Router();
const { saveEmailContent, sendEmailNow} = require("../controllers/emailController");


router.post("/send", sendEmailNow);


// Save email content
router.post("/save", saveEmailContent);

module.exports = router;
