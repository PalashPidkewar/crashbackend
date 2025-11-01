const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers');

router.post('/start', chatController.startChat);
router.post('/message', chatController.sendMessage);
router.get('/',chatController.getUsers)
router.delete('/clear', chatController.clearAllUsers);
module.exports = router;
