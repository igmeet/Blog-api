const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

//add new blog
router.post('', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'meet 2003')


    const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId,
        userId: verify.userId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        categoryTitle: req.body.categoryTitle,
        blogDetail: req.body.blogDetail,
        userName: verify.firstName + " " + verify.lastName
    })

    newBlog.save()
        .then(result => {
            res.status(200).json({
                newBlog: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// get all blogs
router.get('/getAllBlogs', (req, res) => {
    Blog.find()
        .select("_id userId categoryId categoryTitle title imageUrl userName")
        .then(result => {
            res.status(200).json({
                blogs: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// get own blog
router.get('/', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'meet 2003')

    Blog.find({ userId: verify.userId })
        .select("_id userId categoryId categoryTitle title imageUrl userName").then(result => {
            res.status(200).json({
                blogList: result
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

//get blogs by category
router.get('/getByCategory/:id', (req, res) => {
    Blog.find({categoryId:req.params.id})
        .select("_id userId categoryId categoryTitle title imageUrl userName")
        .then(result => {
            res.status(200).json({
                blogs: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})



// delete own blog
router.delete('/:id', (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'meet 2003')
    console.log(verify)

    Blog.deleteOne({ _id: req.params.id, userId: verify.userId })   //04:16:50 yha se dekh
        .then(result => {
            if (result.deletedCount == 0) {
                return res.status(401).json({
                    msg: 'Something Went Wrong'
                })
            }
            res.status(200).json({
                msg: 'Deleted Successfully'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

//update own blog
router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'meet 2003')
    console.log(verify)

    Blog.find({ _id: req.params.id, userId: verify.userId })
        .then(result => {
            if (result.length == 0) {
                return res.status(400).json({
                    msg: 'Something Went Wrong'
                })
            }
            Blog.findOneAndUpdate({ _id: req.params.id, userId: verify.userId }, {
                $set: {
                    userId: verify.userId,
                    title: req.body.title,
                    imageUrl: req.body.imageUrl,
                    categoryId: req.body.categoryId,
                    categoryTitle: req.body.categoryTitle,
                    blogDetail: req.body.blogDetail,
                    userName: verify.firstName + " " + verify.lastName
                }
            })
                .then(result => {
                    res.status(200).json({
                        msg: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })



})

module.exports = router