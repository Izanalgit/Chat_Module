const express = require('express');

const router = express.Router();

router.use('/probechat', require('../controllers/messages/probe'));

module.exports = router;