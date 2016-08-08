var Finders = {
  findItem: function(text) {
    return element(by.cssContainingText('.item', text));
  },
  findTitle: function(title) {
    return browser.isElementPresent(by.cssContainingText('.toolbar-title', title));
  }
}

module.exports = Finders;
