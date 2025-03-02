const mongoose = require('mongoose')

const commentSchema =  new mongoose.Schema({ //schema ka mtlb  data kya kya h aur kis type ka hai
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    userName:{type:String,required:true},
    comment:{type:String,required:true},
    blogId:{type:String,required:true},
    createAt:{type:Date,default:Date.now()}

    

})

module.exports = mongoose.model('Comment',commentSchema)