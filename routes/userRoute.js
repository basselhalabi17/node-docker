const express = require('express')
const router = express.Router()

const {signup,login} = require('../controllers/authcontroller')

router.post('/signup',signup)
router.post('/login',login)
//router.route('/:id').get(getPost).patch(updatePost).delete(deletePost)

module.exports = router