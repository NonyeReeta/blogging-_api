const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
// creating a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
email:{
    type: String,
    required: true,
    unique: [true, 'user already exists'],
    lowercase:true,
    trim: true,
},
password:{
    type: String,
    required: true,
},
firstName:{
    type: String,
    required: true,
    trim: true
},
lastName: {
    type: String,
    required: true,
    trim: true
},
SignUpDate: {
     type: Date, 
     default: Date.now 
    },
})

// HASHING AND VALIDATION OF PASSWORD
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        // console.log(user)
        const hash = await bcrypt.hash(user.password, 10);

        this.password = hash;
        next();
    }
);
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

  const UserModel = mongoose.model('users', UserSchema);

  module.exports = UserModel;