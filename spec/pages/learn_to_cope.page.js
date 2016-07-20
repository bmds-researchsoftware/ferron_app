// learn_to_cope.page.js

var LearnPage = function() {};

LearnPage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('.toolbar-title', 'Learn to cope')
      )
    }
  }
});

module.exports = LearnPage;
