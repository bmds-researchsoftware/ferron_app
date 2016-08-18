(function(context) {
  var directory = '';

  if (isApple()) {
    directory = './build/js/';
  }

  context.importScripts(directory + 'es6-shim.min.js',
                        directory + 'lovefield.min.js',
                        directory + 'cache_and_sync_love.min.js',
                        directory + 'config.js',
                        directory + 'database.js',
                        directory + 'cache.js',
                        directory + 'store-worker.js');

  function isApple() {
    return context.navigator.vendor &&
           context.navigator.vendor.indexOf('Apple') > -1;
  }
})(this);
