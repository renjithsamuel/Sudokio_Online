const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({
    origin:'*'
}));

const {getBoard , postBoard , getUsers , postUser , patchUser , deleteUserById, getCurrentUser, patchManyUsers} = require('../controller/sudokuController')

// Board router
router.post('/getBoard', getBoard);
router.post('/postBoard',postBoard);

// User Router
router.get('/getUsers',getUsers);
router.post('/getCurrentUser',getCurrentUser);
router.post('/postUser',postUser);
router.patch('/patchUserById/:id',patchUser);
router.patch('/patchManyUsers',patchManyUsers);
router.delete('/deleteUserById/:id',deleteUserById);

module.exports = router;