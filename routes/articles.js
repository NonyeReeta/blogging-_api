const express = require('express')
const articleModel = require('../models/articles')
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
articleRoute.get('/:title', (req, res) => {
    const title = req.params.title
    // FIND AND RETURN ARTICLE WITH TITLE

    articleModel.findOne({title: title})
    .then((article) =>{
        res.render('../views/article', {content:article, user:req.user})

    })
    .catch(err => {
        res.status(500).send(err.message)});
        // res.render('article')
   
})
articleRoute.get('/:user/articles', (req, res) => {
    const email = req.params.email
    
    res.render('userarticles')
})

articleRoute.post('/create', (req, res) => {
    const article = req.body
    articleModel.create(article)
    .then(() => {
res.status(201).send({message: "article created successfully",data:article})
    })
    .catch((err) => {
res.status(500).send(err.message)
    })
    // res.render('create')

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