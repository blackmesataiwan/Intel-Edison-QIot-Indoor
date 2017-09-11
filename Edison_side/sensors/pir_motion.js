// Load Grove Motion module
var groveMotion = require('jsupm_biss0001');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Create the motion sensor object on GPIO pin D7
 */
var sensorMotion = function () {
    this.myMotionObj = new groveMotion.BISS0001(7);
    this.lastValue = 0;
    this.myInterval = setInterval(getMotionValue.bind(this), 500);
    EventEmitter.call(this);
}
util.inherits(sensorMotion, EventEmitter);

/**
 * Output data every second until interrupted
 */

var getMotionValue = function () {
    var MotionValue = this.myMotionObj.value();
    if (this.lastValue !== MotionValue) {
        this.lastValue = MotionValue;
        this.emit("message", MotionValue);
        console.log('Motion State: %d', MotionValue);
    }
}

module.exports = sensorMotion;