const mongoose = require('mongoose')

const categorySchema =  new mongoose.Schema({ //schema ka mtlb  data kya kya h aur kis type ka hai
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    title:{type:String,required:true},
    imageUrl:{type:String,required:true}
    

})

module.exports = mongoose.model('Category',categorySchema)