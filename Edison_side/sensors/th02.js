var th02Obj = require('jsupm_th02');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var sensorTH02 = function () {
    this.bar = new th02Obj.TH02();
    this.myInterval = setInterval(getTH02Value.bind(this), 500);
    EventEmitter.call(this);
}
util.inherits(sensorTH02, EventEmitter);


/**
 * Output data every second until interrupted
 */

var getTH02Value = function() {
    var temp = this.bar.getTemperature();
    var hum = this.bar.getHumidity();
    if (temp < -40) {
        temp = 0;
    }
    if (hum < 0) {
        hum = 0;
    }
    this.emit("message", temp.toFixed(1), hum.toFixed(1));
    /*
    process.send({
        temperature: temp.toFixed(1),
        humidity: hum.toFixed(1)
    });
    */
    console.log('Temperature: %s Celsius', temp.toFixed(1));
    console.log('Humidity: %s', hum.toFixed(1));
}

module.exports = sensorTH02;