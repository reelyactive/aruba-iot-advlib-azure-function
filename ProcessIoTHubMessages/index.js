/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */

module.exports = function(context, IoTHubMessages) {
  IoTHubMessages.forEach(messageString => {
    let message = JSON.parse(messageString);

    // Handle serialData
    if(Array.isArray(message.serialData)) {
      message.serialData.forEach(packet => {
        let payload = Buffer.from(packet.data, 'base64');
      });
    }

  });

  context.done();
};