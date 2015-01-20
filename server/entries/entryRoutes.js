var entriesController = require('./entryController.js');

module.exports = function (app) {

  app.route('/')
    // .get(entryController.allLinks)
    .post(entriesController.newEntry);

};
