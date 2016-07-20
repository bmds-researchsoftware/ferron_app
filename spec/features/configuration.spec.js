// configuration_spec.js

var ConfigurationPage = require('../pages/configuration.page.js');
var HomePage = require('../pages/home.page.js');

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

    expect(
      browser.wait(function() { return homePage.pageTitlePresent })
    ).toBe(true)
  });
});
