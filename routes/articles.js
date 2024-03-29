const express = require('express')
const articleModel = require('../models/articles')
const userModel = require('../models/users')
const articleRoute = express.Router()
      
articleRoute.get('/', async (req, res) => {
    // return only published articles
    const {page} = req.query
        articleModel.find({state: 'published'})
        .skip((page - 1) * 10)
        .limit(10)
        .then(articles => {
        res.send(articles)
    })
.catch( (err) => {
      res.status(500).send(err.message)
    })
  })

articleRoute.get('/article/:title', (req, res) => {
    const title = req.params.title
    // FIND, INCREASE READ COUNT AND RETURN ARTICLE WITH TITLE
    articleModel.findOne({title: title})
    .then((article) =>{
        article.read_count++;
        article.save()
        .then((savedArticle) => {
            if(savedArticle.state === 'published') {
                return res.send(savedArticle)
            }
            else {
                return res.send('The article does not exist or has not been published by the author')
            }
        }).catch(err => {
            res.status(500).send('count update failed')
        })
    })
    .catch(err => {
        res.status(500).send(err.message)});
})

// ROUTE TO RETURN ARTICLE FOR EDIT PURPOSE
articleRoute.get('/editarticle/:title', (req, res) => {
    const title = req.params.title
    // FIND AND RETURN ARTICLE WITH TITLE
    articleModel.findOne({title: title})
    .then((article) =>{
        return res.send(article)        
    })
    .catch(err => {
        res.status(500).send(err.message)});
})

articleRoute.get('/search/:arg', (req, res) => {
    const arg = req.params.arg
    articleModel.findOne({$text: {$search: arg}})
    .then((article) => {
        if(article.state === 'published') {
            return res.send(article)
        }
        else {
            return res.send('The article does not exist or has not been published by the author')
        }
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/sort/read_count', (req, res) => {
    articleModel.find({}).sort({read_count : -1})
    .then((articles) => {
        const publishedArticles = articles.filter((article) => {
            return article.state === 'published'
        }) 
        res.status(200).send(publishedArticles)
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/sort/reading_time', (req, res) => {
    articleModel.find({}).sort({reading_time : -1})
    .then((articles) => {
        const publishedArticles = articles.filter((article) => {
            return article.state === 'published'
        }) 
        res.status(200).send(publishedArticles)
    }).catch(err => {
        res.status(500).send(err.message)
    })
})

articleRoute.get('/sort/timestamp', (req, res) => {
    articleModel.find({}).sort({timestamp : -1})
    .then((articles) => {
        const publishedArticles = articles.filter((article) => {
            return article.state === 'published'
        }) 
        res.status(200).send(publishedArticles)
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
    return res.status(200).send(userArticles)
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
    return res.status(200).send(userDraftArticles)
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
        return res.status(200).send(userPublishedArticles)
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
    
    // calculate reading time
    const wordsPerMinute = 183
    const bodyLength = body.split(' ').length;
    const readingTime = Math.ceil(bodyLength / wordsPerMinute)

    articleModel.create({email: email, tags: tags, author: firstName + ' ' + lastName, description: description, body: body, title: title, reading_time: readingTime})
    .then(() => {
        return res.json({message: 'Success'})
    }).catch(err => {
        res.status(500).send(`Article titled '${title}' already exist`)
    })
    })
})

articleRoute.put('/:email/:title/edit', (req, res) => {
    const title = req.params.title;
    const wordsPerMinute = 183
    const bodyLength = req.body.body.split(' ').length;
    const readingTime = Math.ceil(bodyLength / wordsPerMinute)
    articleModel.findOneAndUpdate({title: title}, {title: req.body.title, description: req.body.description, body: req.body.body, tags: req.body.tags, reading_time: readingTime}, { multi: true })
    .then(() => {
        return res.json({message: 'Success'})
    }).catch(err => res.status(500).send(`Article titled '${title}' already exist`)
    );
    
    });


articleRoute.put('/:email/state/:title', (req, res) => {
    const title = req.params.title
    articleModel.findOneAndUpdate({title: title}, {state: 'published'})
    .then((article) => {
    return res.status(200).send(article)
    }).catch(err => {res.status(500).send(err.message)});
})

articleRoute.delete('/:email/:title/delete', (req, res) => {
    const title = req.params.title
    articleModel.findOneAndDelete({title: title})
    .then(() =>{
        return res.json({message: 'Delete Successfull'})
    })
    .catch(err => {
        res.status(500).send(err.message)});
    })

module.exports = articleRoute