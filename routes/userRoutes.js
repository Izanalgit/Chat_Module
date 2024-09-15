const express = require('express');

const createUser = require('../controllers/users/createUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');
const logInUser = require('../controllers/users/logInUser');
const logOutUser = require('../controllers/users/logOutUser');

const router = express.Router();

router.post('/new', createUser);

router.patch('/update', updateUser);

router.delete('/delete', deleteUser);

router.post('/login', logInUser);

router.post('/logout', logOutUser);


module.exports = router;