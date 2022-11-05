const express = require('express')
const articleModel = require('../models/articles')
const userModel = require('../models/users')
const articleRoute = express.Router()

articleRoute.get('/', (req, res) => {
    articleModel.find({})
    .then((articles) => {
// return only published articles
    const publishedArticles = articles.filter((article) => {
        return article.state === 'published'
    }) 
    res.render('../views/index', {contents:publishedArticles, user:req.user})
    // return res.send(publishedArticles)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
    })
})

articleRoute.get('/article/:title', (req, res) => {
    const title = req.params.title
    // FIND, UPDATE AND RETURN ARTICLE WITH TITLE
    articleModel.findOne({title: title})
    .then((article) =>{
        const currentReadCount = article.read_count
        const newReadCount = currentReadCount + 1
        article.read_count = newReadCount
        article.save()
        .then((savedArticle) => {
            res.render('../views/article', {content:savedArticle, user:req.user})

        }).catch(err => {
            res.status(500).send('count update failed')
        })
    })
    .catch(err => {
        res.status(500).send(err.message)});
})

articleRoute.get('/search/:arg', (req, res) => {
    const arg = req.params.arg
    articleModel.find({$text: {$search: arg}})
    .then((articles) => {
        res.status(200).send(articles)
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/sort/read_count', (req, res) => {
    articleModel.find({}).sort({read_count : -1})
    .then((articles) => {
        res.status(200).send(articles)
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/sort/reading_time', (req, res) => {
    articleModel.find({}).sort({reading_time : -1})
    .then((articles) => {
        res.status(200).send(articles)
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/sort/timestamp', (req, res) => {
    articleModel.find({}).sort({timestamp : -1})
    .then((articles) => {
        res.status(200).send(articles)
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/:email/user-page', (req, res) => {
const userEmail = req.params.email
    articleModel.find({})
    .then((articles) => {
// TODO: FILTER ALL ARTICLES AND RETURN ARTICLES BY USER WITH EMAIL ADDRESS THEN RENDER PAGE
const userArticles = articles.filter((article) => {
    return article.email === userEmail
}) 
res.render('../views/userarticles', {contents:userArticles,  email: userEmail})
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
    })
})

articleRoute.get('/:email/user-page/draft', (req, res) => {
const userEmail = req.params.email
    const state = 'draft'
        articleModel.find({})
        .then((articles) => {
    // TODO: FILTER ALL ARTICLES AND RETURN ARTICLES STATE
    const userArticles = articles.filter((article) => {
        return article.email === userEmail
    }) 
    const userDraftArticles = userArticles.filter((articles) => {
        return articles.state === state
    }) 
    res.render('../views/userarticles', {contents:userDraftArticles, email: userEmail})
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err.message)
        })
    })

articleRoute.get('/:email/user-page/published', (req, res) => {
const userEmail = req.params.email
        const state = 'published'
            articleModel.find({})
            .then((articles) => {
        // TODO: FILTER ALL ARTICLES AND RETURN ARTICLES STATE
        const userArticles = articles.filter((article) => {
            return article.email === userEmail
        })
        const userPublishedArticles = userArticles.filter((article) => {
            return article.state === state
        }) 
        res.render('../views/userarticles', {contents:userPublishedArticles, email: userEmail})
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
    console.log(blogDetails)
    // calculate reading time
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

articleRoute.get('/:email/:title/edit', (req, res) => {
    const title = req.params.title
articleModel.findOne({title: title})
.then((article) => {
    res.render('../views/edit', {content:article})
})
.catch(err => res.status(500).send(err.message))
})

articleRoute.post('/:email/:title/edit', (req, res) => {
// console.log('got to edit post')
const title = req.params.title

articleModel.findOne({title: title})
    .then((article) =>{
        article.title = req.body.title
        article.description = req.body.description
        article.body = req.body.body
        article.tags = req.body.tags
        article.save()
        .then((updatedArticle) => {
            res.render('../views/article', {content:updatedArticle, user:req.user})

        }).catch(err => {
            res.status(500).send(err.message,'count update failed')
        })
    })
    .catch(err => {
        res.status(500).send(err.message)});
});

articleRoute.get('/:email/state/:title', (req, res) => {
    const title = req.params.title
    // console.log('got to state')
    articleModel.findOne({title: title})
    .then((article) =>{
        article.state = "published"
        article.save()
        .then((savedArticle) => {
            res.render('../views/article', {content:savedArticle, user:req.user})
        }).catch(err => {
            res.status(500).send('count update failed')
        })
    })
    .catch(err => {
        res.status(500).send(err.message)});
})

articleRoute.get('/:email/:title/delete', (req, res) => {
    const title = req.params.title
    articleModel.findOneAndDelete({title: title})
    .then(() =>{
        res.status(200).send("delete successful")
    })
    .catch(err => {
        res.status(500).send(err.message)});
    })

module.exports = articleRoute