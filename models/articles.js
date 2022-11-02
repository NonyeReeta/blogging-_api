const mongoose = require('mongoose')

// creating a schema
const Schema = mongoose.Schema;

const articleModel = new Schema({
title:{
    type: String,
    required: true,
    unique: true,
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
}
})

module.exports = mongoose.model('articles', articleModel)