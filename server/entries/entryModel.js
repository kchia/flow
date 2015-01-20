var mongoose = require('mongoose'),
    crypto   = require('crypto');

var EntrySchema = new mongoose.Schema({
  userid: String,
  date: Date,
  text: String,
  title: String,
});

EntrySchema.pre('save', function(next) {
  this.date = new Date();
  next();
});

module.exports = mongoose.model('Entry', EntrySchema);
