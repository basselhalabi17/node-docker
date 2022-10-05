const express = require('express')
const mongoose = require('mongoose')
const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, REDIS_URL, SESSION_SECRET, REDIS_PORT}=
        require('./config/config')
const session = require("express-session")
const redis = require('redis')
const cors = require('cors')
let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient(
    { host: REDIS_URL,
        port:REDIS_PORT,
        
    })

      
const router = require('./routes/postRouter')
const authrouter = require('./routes/userRoute')

const app = express()

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
.then(()=>console.log("success"))
.catch((e)=>console.log(e))

app.enable("trust proxy")
app.use(cors({}))
app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: SESSION_SECRET,
    cookie:{
        secure:false,
        resave:false,
        saveUninitialized:false,
        httpOnly:true,
        maxAge: 60000
    }
}))
app.use(express.json())






const port = process.env.PORT || 3000

app.get('/api/v1',(req,res)=>{
    res.send("<h2>Hiiiiii</h2>")
    console.log("yea it ranoooo")
})
//localhost:3000/api/v1/posts
app.use('/api/v1/posts',router)
app.use('/api/v1/users',authrouter)

app.listen(port,()=>console.log(`Server listening on port ${port} ...`))