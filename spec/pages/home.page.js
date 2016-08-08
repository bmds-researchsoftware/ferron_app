var Finders = require('../helpers/finders.helper.js');
var findItem = Finders.findItem;

var HomePage = function() {};

HomePage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() { return Finders.findTitle('Home'); }
  },
  aboutButton: {
    get: function() { return $('.bar-button-icon-only'); }
  },
  startHereButton: {
    get: function() { return findItem('Start here'); }
  },
  checkInButton: {
    get: function() { return findItem('Check-in'); }
  },
  learnToCopeButton: {
    get: function() { return findItem('Learn to cope'); }
  },
  copingSkillsButton: {
    get: function() { return findItem('List of coping skills'); }
  },
  setYourRemindersButton: {
    get: function() { return findItem('Set your reminders'); }
  },
  yourRemindersButton: {
    get: function() { return findItem('Your reminders'); }
  },
  facebookSupportGroupButton: {
    get: function() { return element(by.cssContainingText('button', 'Join our Facebook support group')); }
  }
});

module.exports = HomePage;
