var ConfigurationPage = function() {
  browser.get('http://localhost:8100');
};

ConfigurationPage.prototype = Object.create({}, {
  pageTitle: {
    get: function() { return $('.toolbar-title').getText(); }
  },
  tokenInput: {
    get: function() { return $('.text-input'); }
  },
  submitButton: {
    get: function() { return element(by.cssContainingText('.button-default', 'Go Home')); }
  },
  configureParticipant: {
    value: function(token) {
      browser.sleep(1000) // next fails without this in firefox
      this.tokenInput.sendKeys(token);
      this.submitButton.click();
    }
  }
});

module.exports = ConfigurationPage;
