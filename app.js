const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const userRoute = require('../Blog Api/routes/user');
const catRoute = require('../Blog Api/routes/category')
const blogRoute = require('../Blog Api/routes/blog')
const commentRoute = require('../Blog Api/routes/comment')

mongoose.connect('mongodb+srv://igblog:plmokn00@igblog.r6a5m.mongodb.net/?retryWrites=true&w=majority&appName=igblog')
.then(res=>{console.log("connected to database")})
.catch(err=>{console.log(err)})

app.use(bodyParser.json())


app.use('/user',userRoute)
app.use('/category',catRoute)
app.use('/blog',blogRoute)
app.use('/comment',commentRoute)

app.use('*',(req,res)=>{
    res.status(404).json({
        msg:'Bad request'
    })
})

module.exports = app