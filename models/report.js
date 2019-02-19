var mongoose = require('mongoose');

var ReportSchema = new mongoose.Schema({
  textbook: {
    type: String,
    required: true,
    unique: false
  },
  seller: {
    type: String,
    required: true,
    unique: false
  },
  buyer: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In-Progress', 'Resolved', 'Terminated'],
    default: 'Pending'
  }
});

var Report = mongoose.model('Report', ReportSchema);
module.exports = Report;

