// reminders.page.js

var RemindersPage = function() {};

RemindersPage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('.toolbar-title', 'Reminders')
      )
    }
  }
});

module.exports = RemindersPage;
