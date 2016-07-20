var Finders = require('../helpers/finders.helper.js');
var findButton = Finders.findButton;

var HomePage = function() {};

HomePage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() { return Finders.findTitle('Home'); }
  },
  startHereButton: {
    get: function() { return findButton('Start Here'); }
  },
  checkInButton: {
    get: function() { return findButton('Check-in'); }
  },
  learnToCopeButton: {
    get: function() { return findButton('Learn to cope'); }
  },
  copingSkillsButton: {
    get: function() { return findButton('List of coping skills'); }
  },
  setYourRemindersButton: {
    get: function() { return findButton('Set your reminders'); }
  },
  yourRemindersButton: {
    get: function() { return findButton('Your reminders'); }
  },
  facebookSupportGroupButton: {
    get: function() { return findButton('Join our Facebook support group'); }
  }
});

module.exports = HomePage;
