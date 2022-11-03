const express = require('express')
const articleModel = require('../models/articles')
const userModel = require('../models/users')
const articleRoute = express.Router()

articleRoute.get('/', (req, res) => {
    articleModel.find({})
    .then((articles) => {
        res.render('../views/index', {contents:articles, user:req.user})
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
    })
})
articleRoute.get('/article/:title', (req, res) => {
    const title = req.params.title
    // FIND AND RETURN ARTICLE WITH TITLE

    articleModel.findOne({title: title})
    .then((article) =>{
        res.render('../views/article', {content:article, user:req.user})

    })
    .catch(err => {
        res.status(500).send(err.message)});
   
})
articleRoute.get('/:email/articles', (req, res) => {
    const email = req.params.user
    articleModel.find({})
    .then((articles) => {
console.log(articles)
// TODO: FILTER ALL ARTICLES AND RETURN ARTICLES BY USER WITH EMAIL ADDRESS THEN RENDER PAGE
        // res.render('../views/userarticles', {contents:articles, user:req.user})
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
    })
   
})


articleRoute.post('/:email/create', (req, res) => {
    const blogDetails = req.body
    const user = req.params.email
    userModel.findOne({email: user})
    .then((user) => {
    const {email, firstName, lastName} = user
    const {title, description, body, tags} = blogDetails
    // function to calculate reading time
    const wordsPerMinute = 183
    const bodyLength = body.split(' ').length;
    const readingTime = Math.ceil(bodyLength / wordsPerMinute)

    articleModel.create({email: email, tags: tags, author: firstName + ' ' + lastName, description: description, body: body, title: title, reading_time: readingTime})
    .then(() => {
// TODO: RENDER INDEX FOR NOW BUT IT SHOULD ROUTE TP USER RTICLES PAGE
       res.status(200).send('Article created successfully')
    }).catch((err) => {
        res.status(500).send(err.message)
    })
    }).catch((err) => {
        res.status(500).send(err.message)
    });
})

articleRoute.get('/:email/create', (req, res) => {
    const userEmail = req.params.email
    res.render('../views/create', {email: userEmail})

})

articleRoute.put('/edit/:title', (req, res) => {

    // res.render('edit')
});

articleRoute.put('/state/:title', (req, res) => {
    const title = req.params.title
    articleModel.findOneAndUpdate({title: title})
    .then((article) =>{
        article.state = "published"
        console.log(article)
        res.status(200).send("state changed successfully")
    })
    .catch(err => {
        res.status(500).send(err.message)});
})

articleRoute.delete('/delete/:title', (req, res) => {
    const title = req.params.title
    articleModel.findOneAndDelete(title)
    .then(() =>{
        res.status(200).send("delete successful")
    })
    .catch(err => {
        res.status(500).send(err.message)});
        // res.render('index')
    })
module.exports = articleRoute