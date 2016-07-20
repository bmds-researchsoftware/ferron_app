var Finders = require('../helpers/finders.helper.js');

var LearnPage = function() {};

LearnPage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() { return Finders.findTitle('Learn to cope'); }
  }
});

module.exports = LearnPage;
