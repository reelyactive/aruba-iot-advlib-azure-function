/**
 * Copyright reelyActive 2022
 * We believe in an open Internet of Things
 */


// advlib dependencies (from npm) and protocol-specific settings
// See: https://github.com/reelyactive/advlib
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


// Default dynamic ambient (dynamb) properties to include in output messages
const DEFAULT_DYNAMB_PROPERTIES = [
    'acceleration',
    'angleOfRotation',
    'batteryPercentage',
    'batteryVoltage',
    'elevation',
    'heading',
    'heartRate',
    'illuminance',
    'interactionDigest',
    'isButtonPressed',
    'isContactDetected',
    'isMotionDetected',
    'magneticField',
    'nearest',
    'position',
    'pressure',
    'relativeHumidity',
    'speed',
    'temperature',
    'txCount',
    'unicodeCodePoints',
    'uptime'
];


/**
 * Process IoT Hub Messages from Aruba APs.
 * @param {Object} context The Azure Function context.
 * @param {Array} iotHubMessages The array of messages from the IoT Hub.
 */
module.exports = function(context, iotHubMessages) {
  iotHubMessages.forEach(messageString => {
    let message = JSON.parse(messageString);

    // Handle bleData
    if(Array.isArray(message.bleData)) {
      message.bleData.forEach(packet => {
        let deviceId = ''; // TODO: from properties
        let deviceIdType = ((packet.macAddrType === 'public') ? 2 : 3);
        let payload = Buffer.from(packet.data, 'base64');
        let processedPayload = advlib.process(payload, BLE_PROCESSORS,
                                              INTERPRETERS);
        let dynamb = compileDynamb(deviceId, deviceIdType, processedPayload);
        context.bindings.outputEventHubMessage = JSON.stringify(dynamb);
      });
    }

    // Handle serialData
    if(Array.isArray(message.serialData)) {
      message.serialData.forEach(packet => {
        let payload = Buffer.from(packet.data, 'base64');
        let processedPayload = advlib.process(payload, ENOCEAN_PROCESSORS);

        if(Array.isArray(processedPayload.deviceIds)) {
          let deviceIdElements = processedPayload.deviceIds[0].split('/');
          let deviceId = deviceIdElements[0];
          let deviceIdType = parseInt(deviceIdElements[1]);
          let dynamb = compileDynamb(deviceId, deviceIdType, processedPayload);
          context.bindings.outputEventHubMessage = JSON.stringify(dynamb);
        }
      });
    }

  });

  context.done();
};


/**
 * Compile dynamic ambient (dynamb) data object from device id & data.
 * @param {String} deviceId The device identifier.
 * @param {Number} deviceIdType The type of device identifier (see raddec).
 * @param {Object} data The processed payload data of the device.
 * @return {Object} The compiled dynamb object.
 */
function compileDynamb(deviceId, deviceIdType, data) {
  let dynamb = { deviceId: deviceId,
                 deviceIdType: deviceIdType,
                 timestamp: Date.now() };

  for(const property in data) {
    if(DEFAULT_DYNAMB_PROPERTIES.includes(property)) {
      dynamb[property] = data[property];
    }
  }

  return dynamb;
}