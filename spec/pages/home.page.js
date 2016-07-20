// home.page.js

var HomePage = function() {};

HomePage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('.toolbar-title', 'Home')
      )
    }
  },
  startHereButton: {
    get: function() {
      return element(by.cssContainingText('button', 'Start Here'));
    }
  },
  checkInButton: {
    get: function() {
      return element(by.cssContainingText('button', 'Check-in'));
    }
  },
  learnToCopeButton: {
    get: function() {
      return element(by.cssContainingText('button', 'Learn to cope'));
    }
  },
  copingSkillsButton: {
    get: function() {
      return element(by.cssContainingText('button', 'List of coping skills'));
    }
  },
  setYourRemindersButton: {
    get: function() {
      return element(by.cssContainingText('button', 'Set your reminders'));
    }
  },
  yourRemindersButton: {
    get: function() {
      return element(by.cssContainingText('button', 'Your reminders'));
    }
  },
  facebookSupportGroupButton: {
    get: function() {
      return element(by.cssContainingText('button', 'Join our Facebook support group'));
    }
  }
});

module.exports = HomePage;
