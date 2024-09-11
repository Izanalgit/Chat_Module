const express = require('express');

const createUser = require('../controllers/users/createUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');
const logInUser = require('../controllers/users/logInUser');
const logOutUser = require('../controllers/users/logOutUser');

const router = express.Router();

router.post('/new', require(createUser));

router.patch('/update', require(updateUser));

router.delete('/delete', require(deleteUser));

router.post('/login', require(logInUser));

router.post('/logout', require(logOutUser));


module.exports = router;