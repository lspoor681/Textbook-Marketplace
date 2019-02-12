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

/*TextbookSchema.statics.getTextbooks = function(){
  return new Promise((resolve, reject) => {
    this.find((err, docs) => {
      if(err) {
        console.error(err);
        return reject(err);
      }
      resolve(docs);
    });
  });
}*/

var Textbook = mongoose.model('Textbook', TextbookSchema);
module.exports = Textbook;

