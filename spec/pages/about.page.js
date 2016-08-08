var Finders = require('../helpers/finders.helper.js');

var AboutPage = function() {};

AboutPage.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() { return Finders.findTitle('About'); }
  },
  allAboutPageItems: {
    get: function() { return $('.about-page').all(by.css('.item')); }
  },
  versionItem: {
    get: function() { return this.allAboutPageItems.first().getText(); }
  },
  stage: {
    get: function() { return this.allAboutPageItems.get(1).getText(); }
  },
  uuid: {
    get: function() { return this.allAboutPageItems.get(2).getText(); }
  }
});

module.exports = AboutPage;
