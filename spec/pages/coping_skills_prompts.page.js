var Finders = require('../helpers/finders.helper.js');
var findItem = Finders.findItem;

var CopingSkillsPrompts = function() {};

CopingSkillsPrompts.prototype = Object.create({}, {
  pageTitlePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('h2', 'How do you feel about smoking right now?')
      );
    }
  },
  allTryingNotToSmokeItems: {
    get: function() {
      return $('.prompts-page').all(
        by.cssContainingText('.item', 'I\'m trying not to smoke')
      );
    }
  },
  firstResponse: {
    get: function() { return this.allTryingNotToSmokeItems.first(); }
  },
  secondResponse: {
    get: function() { return this.allTryingNotToSmokeItems.get(1); }
  },
  thirdResponse: {
    get: function() { return findItem('I\'m smoking but'); }
  },
  fourthResponse: {
    get: function() { return findItem('I\'m smoking and'); }
  },
  positiveFeedbackSlidePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('h2', 'Awesome! Keep up the great work.')
      );
    }
  },
  supportQuestionPresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('p', 'It sounds like you could use some help.')
      );
    }
  },
  motivationTipPresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('ion-card', 'Get Motivated Tips')
      );
    }
  },
  useSkillButton:{
    get: function() { return findItem('Use a Skill'); }
  },
  quickTipPresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('ion-card', 'Quit Tips')
      );
    }
  },
  getQuickTipButton:{
    get: function() { return findItem('Get a Quick Tip'); }
  },
  skillChoicePagePresent: {
    get: function() {
      return browser.isElementPresent(
        by.cssContainingText('p', 'How would you like to learn this skill?')
      );
    }
  }
});

module.exports = CopingSkillsPrompts;
