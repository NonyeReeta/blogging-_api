const mongoose = require('mongoose')
require('dotenv').config()


function connectToDb(){
    mongoose.connect(process.env.DB_URL)
    mongoose.connection.on('connected', function(){
    console.log('CONNECTED TO DB SUCCESSFUL')
    })
    mongoose.connection.on('error', function(err){
    })
}

module.exports = {connectToDb}