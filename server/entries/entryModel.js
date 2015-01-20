var mongoose = require('mongoose'),
    crypto   = require('crypto');

var EntrySchema = new mongoose.Schema({
  userid: String,
  username: String,
  date: Date,
  text: String,
  title: String,
});

EntrySchema.pre('save', function(next) {
  var newDate = new Date();
  this.date = newDate.toUTCString()
  next();
});

module.exports = mongoose.model('Entry', EntrySchema);
