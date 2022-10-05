const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const signup = async (req,res)=>{
    const {username,password} = req.body
    const hashpassword = await bcrypt.hash(password,12)
    //console.log(hashpassword)
    try{
    const user = await User.create({
        username,
        password: hashpassword
    })
    console.log(user)
    req.session.useroo = user
    res.status(201).json({user})
    }
    catch(e){
        res.status(400).json({
            status:"failed"
        })
    }
}

const login = async (req,res)=>{
    const {username,password} = req.body
    
    
    try{
    const user = await User.findOne({username})
    if (!user){
        return res.status(404).json({
            status:"not found"
        })
    }

    const iscorrect = await bcrypt.compare(password,user.password)
    if (iscorrect){
         req.session.user = user
         res.status(200).json({status:'success login'})
    }
    else{
        res.status(400).json({status:'failed login'})
    }
    }
    catch(e){
        res.status(400).json({
            status:"failed"
        })
    }
 }

module.exports={signup,login}
