const mongoose = require('mongoose')
require('dotenv').config()


function connectToDb(){
    mongoose.connect(process.env.DB_URL)
    mongoose.connection.on('connected', function(){
        console.log('connection to MONGODB was successful')
    })
    mongoose.connection.on('error', function(err){
        console.log(err)
        console.log('an error occured while connecting to MONGODB')
    })
}

module.exports = {connectToDb}