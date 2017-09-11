// Load Grove Moisture module
var groveMoisture = require('jsupm_grovemoisture');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Create the moisture sensor object on analog pin A0
 */
var sensorMoisture = function () {
    this.myMoistureObj = new groveMoisture.GroveMoisture(1);
    this.lastValue;
    this.myInterval = setInterval(getMoistureValue.bind(this), 1000);
    EventEmitter.call(this);
}
util.inherits(sensorMoisture, EventEmitter);


/**
 * Output data every second until interrupted
 */

var getMoistureValue = function () {
    // Moisture Values (approximate):
    // 0-300,   sensor in air or dry soil
    // 300-600, sensor in humid soil
    // 600+,    sensor in wet soil or submerged in water
    var moistureLevel;
    var moistureValue = parseInt(this.myMoistureObj.value());
    if (this.lastValue !== moistureValue) {
        this.lastValue = moistureValue;
        if (moistureValue >= 0 && moistureValue < 300) {
            moistureLevel = 'Dry';
        } else if (moistureValue >= 300 && moistureValue < 600) {
            moistureLevel = 'Moist';
        } else {
            moistureLevel = 'Wet';
        }
        this.emit("message", moistureValue, moistureLevel);
        //process.send({value: moistureValue, result: moistureLevel});
        console.log('Moisture value: %d, level: %s',
            moistureValue, moistureLevel);
    }
}

module.exports = sensorMoisture;