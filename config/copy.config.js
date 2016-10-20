
// https://www.npmjs.com/package/fs-extra

var stage = process.env['STAGE'] === 'staging' ? 'staging' : (
  process.env['STAGE'] === 'production' ? 'production' : 'development'
);

module.exports = {
  include: [
    {
      src: 'src/assets/',
      dest: 'www/assets/'
    },
    {
      src: 'src/index.html',
      dest: 'www/index.html'
    },
    {
      src: 'node_modules/ionic-angular/polyfills/polyfills.js',
      dest: 'www/build/polyfills.js'
    },
    {
      src: 'node_modules/ionicons/dist/fonts/',
      dest: 'www/assets/fonts/'
    },
    {
      src: 'src/lib/',
      dest: 'www/build/'
    },
    {
      src: 'src/config/' + stage + '/config.js',
      dest: 'www/build/config.js'
    }
  ]
};