const Post = require('../models/postmodel')

const getAllPosts = async (req,res)=>{
    try{
        const posts = await Post.find()
        console.log(posts.length)
        res.status(200).json({posts
        })
    }
    catch(e){
        res.status(400).json({status:"fail" })
    }
}


const getPost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json({status:"success",
        data: {
            post
        }
        })
    }
    catch(e){
        res.status(400).json({status:"fail" })
    }
}

const createPost = async (req,res)=>{
    try{
        const post = await Post.create(req.body)
        res.status(200).json({status:"success",
        data: {
            post
        }
        })
    }
    catch(e){
        res.status(400).json({status:"fail" })
    }
}

const updatePost = async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({status:"success",
        data: {
            post
        }
        })
    }
    catch(e){
        res.status(400).json({status:"fail" })
    }
}

const deletePost = async (req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({status:"deleted with success",
        })
    }
    catch(e){
        res.status(400).json({status:"fail" })
    }
}

module.exports ={
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}