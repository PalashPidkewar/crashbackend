const express = require("express");
const router = express.Router();
const { getSchedule, setSchedule } = require("../controllers/scheduleController");

router.get("/", getSchedule);
router.post("/", setSchedule);

module.exports = router;
