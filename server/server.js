var express     = require('express');
var mongoose    = require('mongoose');

var app = express();

var port = process.env.PORT || 8000;

app.listen(port);

mongoose.connect('mongodb://localhost/flow'); 

require('./config/middleware.js')(app, express);

module.exports = app;
