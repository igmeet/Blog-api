const mongoose = require('mongoose')

const blogSchema =  new mongoose.Schema({ //schema ka mtlb  data kya kya h aur kis type ka hai
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    title:{type:String,required:true},
    imageUrl:{type:String,required:true},
    categoryTitle:{type:String,required:true},
    categoryId:{type:String,required:true},
    blogDetail:{type:String,required:true},
    userName:{type:String,required:true},
    createAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model('Blog',blogSchema)