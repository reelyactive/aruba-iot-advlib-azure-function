/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


module.exports = function(context, req, connection) {
  context.res = { body: connection };
  context.done();
};