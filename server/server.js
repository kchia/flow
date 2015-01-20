  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/flow'); 

require('./config/middleware.js')(app, express);

module.exports = app;

