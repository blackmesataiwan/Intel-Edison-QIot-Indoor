var groveSensor = require('jsupm_grove');

/**
 * Create the relay switch object using GPIO pin 4
 */

var sensorRelay = function () {
    this.relay = new groveSensor.GroveRelay(4);
    this.relayCtrl = relayCtrl;
}

function relayCtrl(value){
    switch (value) {
        case 'on':
        case 1:
            this.relay.on();
            console.log('%s is on', this.relay.name());
            break;
        case 'off':
        case 0:
            this.relay.off();
            console.log('%s is off', this.relay.name());
            break;
        default:
            break;
    }
}

module.exports = sensorRelay;