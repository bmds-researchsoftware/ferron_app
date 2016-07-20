var ConfigurationPage = require('../pages/configuration.page.js');
var HomePage = require('../pages/home.page.js');
var Expectations = require('../helpers/expectations.helper.js');

describe('The Configuration page', function() {
  var configurationPage;
  var homePage = new HomePage();

  beforeEach(function() {
    configurationPage = new ConfigurationPage();
  });

  it('is visible upon initial load of app', function() {
    expect(configurationPage.pageTitle).toBe('Configuration');
  });

  it('accepts valid configuration token', function() {
    configurationPage.configureParticipant('fake participant');

    Expectations.waitAndExpectToBeTrue(function() { return homePage.pageTitlePresent });
  });
});
