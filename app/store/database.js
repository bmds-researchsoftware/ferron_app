/*
 * Define and configure application specific database tables and settings.
 */
(function(context) {
  var Types = context.lf.Type;

  context.CalmCopeQuit = context.CalmCopeQuit || {};
  context.CalmCopeQuit.SCHEMA_NAME = 'calmcopequit';
  context.CalmCopeQuit.SCHEMA_VERSION = 2;

  var QuitTips = Object.create(context.cbit.ResourceCache)
                       .setTableName('quit_tips');
  context.CalmCopeQuit.syncableResources = [
    { name: 'QuitTips', resource: QuitTips }
  ];

  context.CalmCopeQuit.defineSchema = function defineSchema() {
    QuitTips.createTable()
            .addColumn('body', Types.STRING);
  };
})(this);