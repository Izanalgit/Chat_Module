const express = require('express');

const readMessages = require('../controllers/messages/readMessages');
const sendMessage = require('../controllers/messages/sendMessage');

const router = express.Router();

router.get('/read', require(readMessages));

router.post('/send', require(sendMessage));


module.exports = router;