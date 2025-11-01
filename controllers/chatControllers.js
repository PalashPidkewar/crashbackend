const User = require('../models/user');
const Conversation = require('../models/conversation');
const chatService = require('../services/chatService');

// If you identify users by session or temporary ID: for simplicity we can assign a new user record per session
async function startChat(req, res) {
  // create a new user record (blank)
  const userId = await User.createUser({ name: '', email: '', phone: '' });
  // create conversation
  await Conversation.createConversation(userId);
  // initial message
  res.json({ userId, message: `Please could you provide your name.` });
}


async function sendMessage(req, res) {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: 'userId and message required' });
  }
  try {
    const reply = await chatService.handleUserMessage(userId, message);
    console.log(`📨 [${userId}] User: ${message}`);
    console.log(`🤖 Bot: ${reply}`);
    res.json({ message: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// GET all users
async function getUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// async function sendMessage(req, res) {
//   const { userId, message } = req.body;
//   if (!userId || !message) {
//     return res.status(400).json({ error: 'userId and message required' });
//   }
//   try {
//     const reply = await chatService.handleUserMessage(userId, message);
//     res.json({ message: reply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// }



// ✅ Delete all users
async function clearAllUsers (req,res) {
  try {
    await User.deleteAllUsers();
    res.status(200).json({ message: '✅ All users deleted successfully!' });
  } catch (err) {
    console.error('Error deleting users:', err);
    res.status(500).json({ message: '❌ Failed to delete users.' });
  }
};

module.exports = {
  startChat,
  sendMessage,
  getUsers,
  clearAllUsers,
};
