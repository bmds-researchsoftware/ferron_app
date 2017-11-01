import { browser, element, by } from 'protractor';

describe('Smoke Test', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('the participant can navigate to the home page', () => {
    // Click the 'Go Home' button
    element(by.id('go-home-button')).click().then(() => {
      // Wait for the page transition
      browser.driver.sleep(1000);

      expect(element(by.css('.home.content h2'))
        .getAttribute('innerHTML')) // Get the text content
        .toContain("Check in about how you're coping");
    });
  });
  
  it('the user can navigate to the cigarette tracker page', () => {
    // Click the 'Go Home' button
    element(by.id('go-home-button')).click().then(() => {
      // Wait for the page transition
      browser.driver.sleep(1000);

      element(by.id('go-tracker-button')).click().then(() => {
        browser.driver.sleep(1000);

        expect(element(by.css('.content#tracker-content h2'))
          .getAttribute('innerHTML')) // Get the text content
          .toContain("Track your cigarettes smoked each day.");
      });
    });
  });
});