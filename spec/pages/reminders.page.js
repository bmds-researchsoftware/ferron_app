var Finders = require('../helpers/finders.helper.js');

var RemindersPage = function() {};

RemindersPage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() { return Finders.findTitle('Reminders'); }
  }
});

module.exports = RemindersPage;
