const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

//get all user
router.get('/', getUsers);

//get a user
router.get('/:id', getUser);

//create user
router.post('/', createUser);

//update user
router.put('/:id', updateUser);

//delete user
router.delete('/:id', deleteUser);

module.exports = router;