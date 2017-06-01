var groveSensor = require('jsupm_grove');

/**
 * Create the light sensor object using AIO pin 2
 */
var light = new groveSensor.GroveLight(2);
var lastValue = 0;

/**
 * Output data every second until interrupted
 */
var myInterval = setInterval(function() {
    if (lastValue !== light.value()) {
        lastValue = light.value();
        process.send(light.value());
    }
}, 1000);

process.on('SIGINT', function() {
    // exit on ^C
    clearInterval(myInterval);
    console.log('Exiting.');
    process.exit(0);
});
