aruba-iot-advlib-azure-function
===============================

Process IoT data forwarded to Azure by Aruba APs using [advlib](https://github.com/reelyactive/advlib) packet decoding libraries, specifically:
- [advlib-ble](https://github.com/reelyactive/advlib-ble) for Bluetooth Low Energy devices
- [advlib-esp](https://github.com/reelyactive/advlib-esp) for EnOcean Alliance devices

The processed data will observe the [advlib Standard Properties](https://github.com/reelyactive/advlib#standard-properties), fostering vendor-and-technology-agnostic interoperability.


Installation
------------

For local operation, clone this repository and then install the package dependencies with the following command:

    npm install


local.settings.json
-------------------

If running locally, a local.settings.json file should be included in the root folder of this repository, with the following contents:

    {
      "IsEncrypted": false,
      "Values": {
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "AzureWebJobsStorage": "...",
        "EventHubConnectionString": "...",
        "WebPubSubConnectionString": "...",
        "aruba_iot_event_hub_name": "...",
        "raddec_dynamb_event_hub_name": "...",
        "web_pub_sub_hub_name": "..."
      }
    }

Replace the ```"..."``` values with the appropriate strings from the Azure Portal.


Running locally
---------------

With the Azure CLI installed, run the __aruba-iot-advlib-azure-function__ locally from its root folder with the following command:

    func start


License
-------

MIT License

Copyright (c) 2022 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
