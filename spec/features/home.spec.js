var AboutPage = require('../pages/about.page.js'),
  ConfigurationPage = require('../pages/configuration.page.js'),
  CopingSkillsIndex = require('../pages/coping_skill_index.page.js'),
  Expectations = require('../helpers/expectations.helper.js'),
  HomePage = require('../pages/home.page.js'),
  LearnPage = require('../pages/learn_to_cope.page.js'),
  RemindersPage = require('../pages/reminders.page.js');

describe('Home page', function() {
  var aboutPage = new AboutPage(),
    configurationPage,
    copingSkillsIndex = new CopingSkillsIndex(),
    homePage = new HomePage(),
    learnPage = new LearnPage(),
    remindersPage = new RemindersPage(),
    waitAndExpectToBeTrue = Expectations.waitAndExpectToBeTrue;

  beforeEach(function() {
    // need a way to set the state
    // some of the below require this to be first time configured
    // where others require this to not be the first time configured
    configurationPage = new ConfigurationPage();
    configurationPage.configureParticipant('fake participant');

    // this is useless in this capacity
    // would like to get this to work so I do not need a sleep
    waitAndExpectToBeTrue(function() { return homePage.pageTitlePresent });

    browser.sleep(500)
  });

  it('links to more information', function() {
    homePage.aboutButton.click();

    waitAndExpectToBeTrue(function() { return aboutPage.pageTitlePresent });
  });

  it('links to Start Here at first visit', function() {
    // homePage.startHereButton.click();

    // waitAndExpectToBeTrue(function() { return page.pageTitlePresent });
  });

  it('links to Check-in after first visit', function() {
    // homePage.checkInButton.click();

    // waitAndExpectToBeTrue(function() { return page.pageTitlePresent });
  });

  it('links to Learn How To Cope page', function() {
    homePage.learnToCopeButton.click();

    waitAndExpectToBeTrue(function() { return learnPage.pageTitlePresent });
  });

  it('links to Coping Skills Index', function() {
    homePage.copingSkillsButton.click();

    waitAndExpectToBeTrue(function() { return copingSkillsIndex.pageTitlePresent });
  });

  it('links to Set Your Reminders at first visit', function() {
    homePage.setYourRemindersButton.click();

    waitAndExpectToBeTrue(function() { return remindersPage.pageTitlePresent });
  });

  it('links to Your Reminders after first visit', function() {
    // homePage.yourRemindersButton.click();

    // waitAndExpectToBeTrue(function() { return remindersPage.pageTitlePresent });
  });

  it('links to Facebook Support Group', function() {
    // homePage.facebookSupportGroupButton.click();

    // waitAndExpectToBeTrue(function() { return page.pageTitlePresent });
  });
});
