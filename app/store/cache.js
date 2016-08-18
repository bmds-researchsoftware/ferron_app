/*
 * Runs in a Web Worker context. Initializes the database and kicks off
 * synchronization with the server.
 */
(function(context) {
  var SCHEMA_NAME = context.CalmCopeQuit.SCHEMA_NAME;
  var SCHEMA_VERSION = context.CalmCopeQuit.SCHEMA_VERSION;
  var PAYLOADS_API_PATH = '/token_auth/api/payloads';
  var STATUSES = {
    Initialized: 'initialized',
    Authenticated: 'authenticated'
  };
  var SYNC_PERIOD_IN_MS = 2 * 60 * 1000;
  var schemaBuilder = context.lf.schema.create(SCHEMA_NAME, SCHEMA_VERSION);
  var TABLES = {
    AuthenticationTokens: 'authentication_tokens',
    Devices: 'devices'
  };

  var Cache = {
    context: context,

    setContext: function setContext(newContext) {
      this.context = newContext;

      return this;
    },

    storeType: context.lf.schema.DataStoreType.INDEXED_DB,

    setStoreType: function setStoreType(type) {
      this.storeType = type;
    },

    localResources: {},

    syncableResources: {},

    defineSchema: function defineSchema() {
      var Types = this.context.lf.Type;

      this.localResources.AuthenticationTokens.createTable()
        .addColumn('value', Types.STRING);

      this.syncableResources.Devices.createTable()
        .addColumn('device_uuid', Types.STRING)
        .addColumn('manufacturer', Types.STRING)
        .addColumn('model', Types.STRING)
        .addColumn('platform', Types.STRING)
        .addColumn('device_version', Types.STRING);

      this.context.CalmCopeQuit.defineSchema();
    },

    onUpgrade: function onUpgrade(rawDb) {
      return rawDb.dump();
    },

    initialize: function initialize() {
      this.localResources.AuthenticationTokens.fetchAll()
        .then((function(tokens) {
          if (tokens.length > 0) {
            this.context.postMessage({ status: STATUSES.Authenticated });
            this.syncableResources.Devices.fetchAll()
              .then(function(devices) {
                if (devices.length == 0) {
                  return;
                }

                context.cbit.Payload
                  .setUrl(context.CalmCopeQuit.SERVER_URL + PAYLOADS_API_PATH)
                  .setSecret(tokens[0].value)
                  .setKey(devices[0].device_uuid);
                context.cbit.Synchronizer.setPayloadResource(context.cbit.Payload);
                context.cbit.Synchronizer.setPeriod(SYNC_PERIOD_IN_MS);
                context.cbit.Synchronizer.run();
              });
          } else {
            this.context.postMessage({ status: STATUSES.Initialized });
          }
        }).bind(this));
    },

    addTables: function addTables() {
      try {
        this.defineSchema();
        // the db connection must be shared between resources
        var dbConnection = schemaBuilder.connect({
          storeType: this.storeType,
          onUpgrade: this.onUpgrade
        });

        for (var resourceName in this.syncableResources) {
          var resource = this.syncableResources[resourceName];

          resource.dbConnection = dbConnection;
          context.cbit.Synchronizer.registerCache(resource);
        }

        for (var localResourceName in this.localResources) {
          var localResource = this.localResources[localResourceName];

          localResource.dbConnection = dbConnection;
        }

        context.cbit.Synchronizer
          .setNetwork({
            // punt on this
            hasConnection: function() { return true; }
          });
      } catch (error) {
        // schema is finalized
        if (context.DEBUG) {
          context.console.log(error);
        }
      }
    },
  };

  context.CalmCopeQuit.syncableResources.forEach(function(resource) {
    Cache.syncableResources[resource.name] = resource.resource
                                             .setSchemaBuilder(schemaBuilder);
  })

  Cache.localResources.AuthenticationTokens = Object.create(context.cbit.LocalResource)
    .setSchemaBuilder(schemaBuilder)
    .setTableName(TABLES.AuthenticationTokens);
  Cache.syncableResources.Devices = Object.create(context.cbit.ResourceCache)
    .setSchemaBuilder(schemaBuilder)
    .setTableName(TABLES.Devices);

  context.CalmCopeQuit = context.CalmCopeQuit || {};
  context.CalmCopeQuit.Cache = Cache;
})(this);