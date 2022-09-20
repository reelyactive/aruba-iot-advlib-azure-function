/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


const fs = require('fs');
const path = require('path');


module.exports = function(context, req) {
  let index = path.join(context.executionContext.functionDirectory,
                        'index.html');

  fs.readFile(index, 'utf8', (err, data) => {
    if(!err) {
      context.res = {
        headers: { "Content-Type": "text/html" },
        body: data
      };
    }

    context.done(err);
  });

};