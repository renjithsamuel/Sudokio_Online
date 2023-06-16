const express = require('express');
const router = express.Router();

const {getBoard , postBoard , getUsers , postUser , patchUser , deleteUserById} = require('../controller/sudokuController')

// Board router
router.get('/getBoard', getBoard);
router.post('/postBoard',postBoard);

// User Router
router.get('/getUsers',getUsers);
router.post('/postUser',postUser);
router.patch('/patchUserById/:id',patchUser);
router.delete('/deleteUserById/:id',deleteUserById);

module.exports = router;