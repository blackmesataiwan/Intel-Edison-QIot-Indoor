var UVSensor = require('jsupm_guvas12d');
var g_GUVAS12D_AREF = 5.0; // analog voltage, usually 3.3 or 5.0
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Create the UV sensor objcet on analog pin A3
 */
var sensorUV = function () {
    this.myUVSensor = new UVSensor.GUVAS12D(3, g_GUVAS12D_AREF);
    this.lastValue;
    this.myInterval = setInterval(getUvValue.bind(this), 1000);
    EventEmitter.call(this);
}
util.inherits(sensorUV, EventEmitter);

/**
 * Output data every second until interrupted
 */

var getUvValue = function() {
    var uvSensorVolts = this.myUVSensor.volts();
    var uvSensorValue = this.myUVSensor.intensity();
    if (this.lastValue !== uvSensorValue) {
        this.lastValue = uvSensorValue;
        this.emit("message", uvSensorVolts.toFixed(1), uvSensorValue.toFixed(1));
        /*
        process.send({volts: uvSensorVolts.toFixed(1),
            intensity: uvSensorValue.toFixed(1)});
            */
        console.log('Volts: %d, Intensity: %d mW/m^2',
            uvSensorVolts, uvSensorValue);
    }
}

module.exports = sensorUV;
