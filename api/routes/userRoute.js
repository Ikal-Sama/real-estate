const express = require('express');
const { updateUser, deleteUser, getUserListing, getUser, getAllUser } = require('../controller/userCtrl');
const  verifyToken  = require('../utils/verifyUser');
const router = express.Router();


router.post('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListing)
router.get('/:id', verifyToken, getUser)
router.get('/',verifyToken,  getAllUser)

module.exports = router