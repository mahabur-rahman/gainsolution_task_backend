const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { updateUser } = require('../controllers/userController')

// update user 
router.put('/:id', updateUser)


module.exports = router