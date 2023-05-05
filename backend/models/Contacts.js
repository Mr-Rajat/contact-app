const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactsSchema = new Schema({
    user: {
        // to distingush b/w users to show them their respective contacts
        type: mongoose.Schema.Types.ObjectId,
        // user model added
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