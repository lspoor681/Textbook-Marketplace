var mongoose = require('mongoose');

var TextbookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  author: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: Number,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: false
  }
});

//Getter and Setter for price to force showing of 2 decimal places in our price, without rounding
TextbookSchema.path('price').get(function(x) {
  return parseFloat(Math.round(x * 100) / 100).toFixed(2);
});
TextbookSchema.path('price').set(function(x) {
  return(x);
});

var Textbook = mongoose.model('Textbook', TextbookSchema);
module.exports = Textbook;

