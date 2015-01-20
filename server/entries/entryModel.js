var mongoose = require('mongoose'),
    crypto   = require('crypto');

var EntrySchema = new mongoose.Schema({
 userid: String
 date: Date,
 text: String,
 title: String,
});

module.exports = mongoose.model('Entry', EntrySchema);
