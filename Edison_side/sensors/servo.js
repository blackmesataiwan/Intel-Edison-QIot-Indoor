var groveSensor = require('jsupm_servo');

/**
 * Create the relay switch object using GPIO pin 0
 */

var sensorServo = function () {
    this.servo = new groveSensor.Servo(6);
    this.setAngle = setAngle;
}

function setAngle(data){
    this.servo.setAngle(data);
}

module.exports = sensorServo;