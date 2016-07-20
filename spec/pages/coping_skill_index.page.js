// coping_skills_index.page.js

var CopingSkillsIndex = function() {};

CopingSkillsIndex.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('.toolbar-title', 'CopingSkills')
      )
    }
  }
});

module.exports = CopingSkillsIndex;
