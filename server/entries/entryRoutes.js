var entriesController = require('./entryController.js');

module.exports = function (app) {

  app.route('/')
    .get(entriesController.allEntries)
    .post(entriesController.newEntry);

};
