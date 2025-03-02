const express = require('express');
const router = express.Router();
const Category = require('../model/Category')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

//add category
router.post('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'meet 2003')
    const newCategory = new Category({
        _id:new mongoose.Types.ObjectId,
        userId:verify.userId,
        title:req.body.title,
        imageUrl:req.body.imageUrl
    })

    newCategory.save()
    .then(result=>{
        res.status(200).json({
            newCategory:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get all category
router.get('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'meet 2003')

    Category.find({userId:verify.userId})
    .select("_id userId title imageUrl")
    .then(result=>{
        res.status(200).json({
            categoryList:result
        })
       
    })
    .catch(err=>{
        res.status(500).json({  
            error:err
        })
    })
})

//delete category
router.delete('/:id',(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'meet 2003')
    console.log(verify)
    
    Category.deleteOne({_id:req.params.id,userId:verify.userId})   //04:16:50 yha se dekh
    .then(result=>{
        if(result.deletedCount == 0)
        {
            return res.status(401).json({
                msg:'Something Went Wrong'
            })
        }
        res.status(200).json({
            msg:'Deleted Successfully'
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//update category
router.put('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'meet 2003')
    console.log(verify)

    Category.find({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.length == 0)
        {
            return res.status(400).json({
                msg:'Something Went Wrong'
            })
        }
        Category.findOneAndUpdate({_id:req.params.id,userId:verify.userId},{
            $set:{
                userId:verify.userId,
                title:req.body.title,
                imageUrl:req.body.imageUrl
            }
        })
        .then(result=>{
            res.status(200).json({
                msg:result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
    })
.catch(err=>{
    res.status(500).json({
        error:err
    })
})
    


})


module.exports = router