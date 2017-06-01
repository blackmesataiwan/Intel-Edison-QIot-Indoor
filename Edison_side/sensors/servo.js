var groveSensor = require('jsupm_servo');

/**
 * Create the relay switch object using GPIO pin 0
 */
var servo = new groveSensor.Servo(6);

process.on('message', function(data) {
    servo.setAngle(data);
});

process.on('SIGINT', function() {
    // exit on ^C
    console.log('Exiting.');
    process.exit(0);
});
