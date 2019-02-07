var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var TextbookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  author: {
    type: String,
    unique: true,
    required: false,
    trim: true
  },
  ISBN: {
    type: String,
    
    required: true,
  },
  price: {

  }
});

var Textbook = mongoose.model('Textbook', TextbookSchema);
module.exports = Textbook;

