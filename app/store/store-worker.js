/*
 * Facilitates message passing between the worker and the host. Runs in a
 * Web Worker context.
 */
(function(context) {
  var STATUSES = { MESSAGE_RESOLVED: 'message_resolved' };
  var RESOURCE_TYPES = { CACHE: 'cache' };

  var Cache = context.CalmCopeQuit.Cache;

  context.onmessage = function onMessage(event) {
    var methodCalled;

    if (event.data.resource === RESOURCE_TYPES.CACHE) {
      methodCalled = Cache[event.data.method].bind(Cache);
    } else {
      var Resource = Cache.localResources[event.data.resource] ||
        Cache.syncableResources[event.data.resource];
      methodCalled = Resource[event.data.method].bind(Resource);
    }

    Promise.resolve(methodCalled(event.data.argument)).then(function(result) {
      if (event.data.messageId == null) {
        return;
      }

      context.postMessage({
        messageId: event.data.messageId,
        result: result,
        status: STATUSES.MESSAGE_RESOLVED
      });
    });
  };

  Cache.addTables();
})(this);
