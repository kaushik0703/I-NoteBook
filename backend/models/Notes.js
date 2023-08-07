const mongoose = require('mongoose');
const {Schema} = mongoose; // importing schema from mongoose

const NotesSchema = new Schema({
    user: {   // To associate notes with user this field is required
        type: mongoose.Schema.Types.ObjectId,  //userId (foreign key)
        ref: 'user'  // reference from user model
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('notes', NotesSchema);