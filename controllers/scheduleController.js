const Schedule = require("../models/scheduleModel");

// Get schedule
exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.getDay();
    res.json(schedule || { send_day: 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get schedule" });
  }
};

// Set schedule
exports.setSchedule = async (req, res) => {
  try {
    const { send_day } = req.body;
    const result = await Schedule.setDay(send_day);
    res.json({ message: "Schedule set successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to set schedule" });
  }
};
