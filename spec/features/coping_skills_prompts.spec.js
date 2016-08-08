var ConfigurationPage = require('../pages/configuration.page.js'),
  CopingSkillsPrompts = require('../pages/coping_skills_prompts.page.js'),
  Expectations = require('../helpers/expectations.helper.js'),
  HomePage = require('../pages/home.page.js');

describe('Coping Skills Prompts', function() {
  var configurationPage,
    copingSkillsPrompts = new CopingSkillsPrompts(),
    homePage = new HomePage(),
    waitAndExpectToBeTrue = Expectations.waitAndExpectToBeTrue;

  beforeEach(function() {
    configurationPage = new ConfigurationPage();
    configurationPage.configureParticipant('fake participant');
    browser.sleep(500);
    homePage.startHereButton.click();
    browser.sleep(500);
  });

  it('chooses the first response', function() {
    copingSkillsPrompts.firstResponse.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.positiveFeedbackSlidePresent
    });
  });

  it('chooses the second response and chooses to learn a skill', function() {
    copingSkillsPrompts.secondResponse.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.supportQuestionPresent
    });

    browser.sleep(500);
    copingSkillsPrompts.useSkillButton.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.skillChoicePagePresent
    });
  });

  it('chooses the second response and chooses to get a tip', function() {
    copingSkillsPrompts.secondResponse.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.supportQuestionPresent
    });

    browser.sleep(500);
    copingSkillsPrompts.getQuickTipButton.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.quickTipPresent
    });
  });

  it('chooses the third response and chooses to learn a skill', function() {
    copingSkillsPrompts.thirdResponse.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.supportQuestionPresent
    });

    browser.sleep(500);
    copingSkillsPrompts.useSkillButton.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.skillChoicePagePresent
    });
  });

  it('chooses the third response and choose to get a tip', function() {
    copingSkillsPrompts.thirdResponse.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.supportQuestionPresent
    });

    browser.sleep(500);
    copingSkillsPrompts.getQuickTipButton.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.quickTipPresent
    });
  });

  it('chooses the fourth response', function() {
    copingSkillsPrompts.fourthResponse.click();

    waitAndExpectToBeTrue(function() {
      return copingSkillsPrompts.motivationTipPresent
    });
  });
});
