// Karma configuration
// Generated on Wed Jul 06 2016 06:49:54 GMT-0500 (CDT)
// See https://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/es6-shim/es6-shim.js',        // TypeError: undefined is not a constructor (evaluating 'new exports.Map()')
      'node_modules/reflect-metadata/Reflect.js', // 'Uncaught reflect-metadata shim is required when using class decorators'
      'node_modules/zone.js/dist/zone.js',        // Zone.js dependencies (Zone undefined)
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      'app/**/*.spec.ts',
      { pattern: 'node_modules/reflect-metadata/Reflect.js.map', included: false, served: true }, // 404 on the same
      { pattern: 'www/build/**/*.html', included: false }
    ],

    // list of files to exclude
    exclude: [
      'node_modules/angular2/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['browserify']
    },
 
    browserify: {
      debug: true,
      transform: [
        ['browserify-istanbul', {
          instrumenter: require('isparta'),
          instrumenterConfig: { embedSource: true },
          ignore: ['**/*.spec.ts','**/*.d.ts']
        }]
      ],
      plugin: [
        ['tsify', 'karma-remap-istanbul', 'karma-coverage']
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        { type: 'text' }
      ],
      check: {
        global: {
          statements: 95,
          branches: 95,
          functions: 85,
          lines: 95
        }
      }
    },
  
    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        html: 'coverage'
      },
      timeoutNotCreated: 1000,
      timeoutNoMoreFiles: 1000
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,
 
    proxies: {
      '/build': '/base/www/build'
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
