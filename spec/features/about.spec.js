var AboutPage = require('../pages/about.page.js'),
  ConfigurationPage = require('../pages/configuration.page.js'),
  HomePage = require('../pages/home.page.js');

describe('About page', function() {
  var aboutPage = new AboutPage(),
    configurationPage,
    homePage = new HomePage();

  it('lists the version, stage, and uuid', function() {
    configurationPage = new ConfigurationPage();
    configurationPage.configureParticipant('fake participant');
    browser.sleep(500);
    homePage.aboutButton.click();
    browser.sleep(500);

    expect(aboutPage.versionItem).toBe('App version');
    expect(aboutPage.stage).toBe('Stage\nstaging');
    expect(aboutPage.uuid).toBe('Device identifier\nDEFAULT-UUID');
  });
});
