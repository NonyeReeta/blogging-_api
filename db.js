const mongoose = require('mongoose')
require('dotenv').config()


function connectToDb(){
    mongoose.connect(process.env.DB_URL)
    mongoose.connection.on('connected', function(){
    })
    mongoose.connection.on('error', function(err){
    })
}

module.exports = {connectToDb}