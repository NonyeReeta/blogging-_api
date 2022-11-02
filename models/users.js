const mongoose = require('mongoose')

// creating a schema
const Schema = mongoose.Schema;

const userModel = new Schema({
email:{
    type: String,
    required: true,
    unique: true,
},
firstName:{
    type: String,
},
lastName: {
        type: String,
},
password:{},
})

module.exports = mongoose.model('users', userModel)
