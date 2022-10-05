const express = require('express')
const router = express.Router()

const {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController')

const protect = require('../middleware/auth')
router.route('/').get(protect,getAllPosts).post(protect,createPost)
router.route('/:id').get(protect,getPost).patch(protect,updatePost).delete(protect,deletePost)

module.exports = router