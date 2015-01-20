var morgan      = require('morgan'), 
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); 


module.exports = function (app, express) {
  var userRouter = express.Router();
  var entryRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));


  app.use('/api/users', userRouter); // use user router for all user request

  // authentication middleware used to decode token and made available on the request
  app.use('/api/entries', helpers.decode);
  app.use('/api/entries', entryRouter); // user entry router for entry request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.get('/',
    function(req, res) {
    sess = req.session;
    if (!sess.username){
      res.redirect('/login');
    }
    res.render('index');

  });

  app.get('/logout', function(req,res){
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../entries/entryRoutes.js')(entryRouter);
};
