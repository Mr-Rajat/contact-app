const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default:"General"
    },
    date: {
        type: Date,
        default: Date.now
    },
  });
//   const Notes = mongoose.model('notes',NotesSchema)
//   module.exports = Notes
module.exports = mongoose.model('contacts', ContactsSchema)