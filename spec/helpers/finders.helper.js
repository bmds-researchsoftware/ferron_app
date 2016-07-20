var Finders = {
  findButton: function(text) {
    return element(by.cssContainingText('button', text));
  },
  findTitle: function(title) {
    return browser.isElementPresent(by.cssContainingText('.toolbar-title', title));
  }
}

module.exports = Finders;
