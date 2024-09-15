const express = require('express');

const readMessages = require('../controllers/messages/readMessages');
const sendMessage = require('../controllers/messages/sendMessage');

const router = express.Router();

router.get('/read', readMessages);

router.post('/send', sendMessage);


module.exports = router;