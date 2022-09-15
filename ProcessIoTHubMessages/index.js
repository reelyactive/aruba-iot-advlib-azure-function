/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


const advlib = require('advlib');


const BLE_PROCESSORS = [
    { processor: require('advlib-ble'),
      libraries: [ require('advlib-ble-services'),
                   require('advlib-ble-manufacturers') ],
      options: { isPayloadOnly: true,
                 indices: [ require('sniffypedia') ] } }
];
const ENOCEAN_PROCESSORS = [
    { processor: require('advlib-esp'),
      libraries: [],
      options: { ignoreProtocolOverhead: true,
                 indices: [ require('sniffypedia') ] } }
];
const INTERPRETERS = [ require('advlib-interoperable') ];


module.exports = function(context, IoTHubMessages) {
  IoTHubMessages.forEach(messageString => {
    let message = JSON.parse(messageString);

    // Handle bleData
    if(Array.isArray(message.bleData)) {
      message.bleData.forEach(packet => {
        let payload = Buffer.from(packet.data, 'base64');
        let processedPayload = advlib.process(payload, BLE_PROCESSORS,
                                              INTERPRETERS);
        context.bindings.outputEventHubMessage = JSON.stringify(processedPayload);
      });
    }

    // Handle serialData
    if(Array.isArray(message.serialData)) {
      message.serialData.forEach(packet => {
        let payload = Buffer.from(packet.data, 'base64');
        let processedPayload = advlib.process(payload, ENOCEAN_PROCESSORS);
        context.bindings.outputEventHubMessage = JSON.stringify(processedPayload);
      });
    }

  });

  context.done();
};