var fs = require('fs');

exports.config = {
  framework: 'jasmine', // this is the default
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['features/*.spec.js'],
  baseURL: 'http://localhost:8100',
  useAllAngular2AppRoots: true,
  capabilities: { 'browserName': 'chrome' },
  onPrepare: function() {
    var width = 360;
    var height = 590;
    browser.manage().window().setSize(width, height);

    afterEach(function() {
      jasmine.getEnv().addReporter(new function() {
        this.specDone = function(result) {
          if (result.failedExpectations.length > 0) {
            browser.takeScreenshot().then(function(png) {
              var screenShotDirectory = 'spec/screenshots/';
              var date = new Date()
              var fileName = date.getTime(date);
              var stream = fs.createWriteStream(screenShotDirectory + fileName.toString());
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          }
        };
      });
    });
  }
}
