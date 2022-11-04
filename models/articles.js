const mongoose = require('mongoose')

// creating a schema
const Schema = mongoose.Schema;

const articleModel = new Schema({
title:{
    type: String,
    required: true,
    unique:[ true, 'Article with this title already exists']
},
description: {
    type: String,
},
author: {
    type: String,
},
state: {
    type: String,
    default: 'draft',
},
read_count: {
    type: Number,
    default: 0,
},
reading_time: {
    type: Number,
},
body: {
    type: String,
    required: true,
},
tags: {
    type: String,
},
timestamp: {
    type:Date,
    default: Date.now,
},
email: {
    type: String,
}
})

articleModel.index({author: 'text', title: 'text', tags: 'text'})


module.exports = mongoose.model('articles', articleModel)