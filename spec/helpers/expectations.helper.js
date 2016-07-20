var Expectations = {
  waitAndExpectToBeTrue: function(fn) {
    expect(browser.wait(fn)).toBe(true);
  }
}

module.exports = Expectations;
