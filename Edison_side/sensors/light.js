var groveSensor = require('jsupm_grove');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
/**
 * Create the light sensor object using AIO pin 2
 */
var sensorLight = function () {
    this.light = new groveSensor.GroveLight(2);
    this.lastValue = 0;
    this.myInterval = setInterval(getLightValue.bind(this), 1000);
    EventEmitter.call(this);
}
util.inherits(sensorLight, EventEmitter);

var getLightValue = function () {
    if (this.lastValue !== this.light.value()) {
        this.lastValue = this.light.value();
        this.emit("message", this.lastValue);
    }
}

module.exports = sensorLight;