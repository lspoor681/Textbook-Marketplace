var mongoose = require('mongoose');

var TextbookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: false,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  make: {
    type: String,
    required: true
  }
});

var Textbook = mongoose.model('Textbook', TextbookSchema);
module.exports = Textbook;

