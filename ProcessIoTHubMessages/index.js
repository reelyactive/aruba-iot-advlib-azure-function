/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


const advlib = require('advlib-esp');


const ADVLIB_OPTIONS = { ignoreProtocolOverhead: true };


module.exports = function(context, IoTHubMessages) {
  IoTHubMessages.forEach(messageString => {
    let message = JSON.parse(messageString);

    // Handle serialData
    if(Array.isArray(message.serialData)) {
      message.serialData.forEach(packet => {
        let payload = Buffer.from(packet.data, 'base64');
        let processedPayload = advlib.process(payload, [], ADVLIB_OPTIONS);
      });
    }

  });

  context.done();
};