var rotaryEncoder = require('jsupm_rotaryencoder');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
/**
 * Instantiate a Grove Rotary Encoder, using signal pins D2 and D3
 */

var sensorRotaryEncoder = function () {
    this.RotaryEncoder = new rotaryEncoder.RotaryEncoder(2, 3);
    this.lastValue = 0;
    this.myInterval = setInterval(getRotaryEncoderValue.bind(this), 100);
    EventEmitter.call(this);
}
util.inherits(sensorRotaryEncoder, EventEmitter);

/**
 * Output data every second until interrupted
 */

var getRotaryEncoderValue = function() {
    var positionValue = this.RotaryEncoder.position();
    if (this.lastValue !== positionValue) {
        this.lastValue = positionValue;
        this.emit("message", positionValue);
        console.log('Position: %d', positionValue);
    }
}

module.exports = sensorRotaryEncoder;
