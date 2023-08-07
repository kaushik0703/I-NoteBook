const mongoose = require('mongoose');
const {Schema} = mongoose; // importing schema from mongoose

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  const User = mongoose.model('user', UserSchema);
//   User.createIndexes(); //to ensure different users but index is created of (in try catch in auth.js)
  module.exports = User;