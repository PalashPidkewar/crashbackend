const express = require('express');
const router = express.Router();

const { subscribeNewsletter , getAllSubscribers , sendNewsletterToAll} = require('../controllers/newsletterController');

// POST /api/newsletter
router.post('/newsletter', subscribeNewsletter);
router.get('/subscribers',getAllSubscribers);
router.post('/send-all', sendNewsletterToAll);
module.exports = router;
