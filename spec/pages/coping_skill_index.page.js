var Finders = require('../helpers/finders.helper.js');

var CopingSkillsIndex = function() {};

CopingSkillsIndex.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() { return Finders.findTitle('CopingSkills'); }
  }
});

module.exports = CopingSkillsIndex;
