var Entry    = require('./entryModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');


module.exports = {
  newEntry: function (req, res, next) {
    var title = req.body.title;
    var text = req.body.text;
    var userid = req.user._id;
    var username = req.user.username;

    var createEntry = Q.nbind(Entry.create, Entry);
    createEntry({ title: title, text: text, userid: userid, username: username})
      .then(function(createdEntry){
        if (createdEntry) {
          res.json(createdEntry);
        }
      })
      .fail(function (error) {
        next(error);
      })

  },

  allEntries: function (req, res, next) {
    var userid = req.user._id;
    var findAll = Q.nbind(Entry.find, Entry);

    findAll({userid: userid})
      .then(function (entries) {
        res.json(entries);
      })
      .fail(function (error) {
        next(error);
      });
  },

  countEntries: function (req, res, next) {
    var userid = req.user._id;
    var countAll = Q.nbind(Entry.count, Entry);

    countAll({userid: userid})
      .then(function (count) {
        res.json(count);
      })
      .fail(function (error) {
        next(error);
      });
  },  
  // findEntries: function(req, res, next){
  //   var findEntry = Q.nbind(Entry.findOne, Entry);
  //   findEntry({title: title})
  //     .then(function (entry) {
  //       if (entry) {
  //         res.json(entry);
  //         next();
  //       } else {
  //         next(new Error('Entry not found'));
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });

  // },
  // findUrl: function (req, res, next, code) {
  //   var findLink = Q.nbind(Link.findOne, Link);
  //   findLink({code: code})
  //     .then(function (link) {
  //       if (link) {
  //         req.navLink = link;
  //         next();
  //       } else {
  //         next(new Error('Link not added yet'));
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // },



  // navToLink: function (req, res, next) {
  //   var link = req.navLink;
  //   link.visits++;
  //   link.save(function (err, savedLink) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       res.redirect(savedLink.url);
  //     }
  //   });
  // }

};
