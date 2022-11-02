const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
// creating a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
email:{
    type: String,
    required: true,
    unique: [true, 'user already exists']
},
firstName:{
    type: String,
},
lastName: {
        type: String,
},
password:{
    type: String,
},
})

// HASHING AND VALIDATION OF PASSWORD
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

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