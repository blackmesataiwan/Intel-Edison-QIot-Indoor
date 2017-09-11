var upmButton = require('jsupm_button');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Create the button object using GPIO pin 8
 */

var sensorButton = function () {
    this.button = new upmButton.Button(8);
    this.lastValue = 0;
    this.myInterval = setInterval(getButtonValue.bind(this), 100);
    EventEmitter.call(this);
}
util.inherits(sensorButton, EventEmitter);

var getButtonValue = function () {
    var buttonValue = this.button.value();
    if (this.lastValue !== buttonValue) {
        this.lastValue = buttonValue;
        this.emit("message", buttonValue);
        //process.send(buttonValue);
        console.log('Button State: %d', buttonValue);
    }
}

//this.button = new upmButton.Button(8);
//var lastValue = 0;

/**
 * Output data every second until interrupted
 */


module.exports = sensorButton;