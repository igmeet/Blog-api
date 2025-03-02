const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({ //schema ka mtlb  data kya kya h aur kis type ka hai
    _id:mongoose.Schema.Types.ObjectId,
    firstName:{type:String, required:true },
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}


})

module.exports = mongoose.model('User',UserSchema)