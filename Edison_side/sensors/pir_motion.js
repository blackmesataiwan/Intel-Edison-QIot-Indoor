// Load Grove Motion module
var groveMotion = require('jsupm_biss0001');

/**
 * Create the motion sensor object on GPIO pin D7
 */
var myMotionObj = new groveMotion.BISS0001(7);
var lastValue;

/**
 * Output data every second until interrupted
 */
var myInterval = setInterval(function() {
    var MotionValue = myMotionObj.value();
    if (lastValue !== MotionValue) {
        lastValue = MotionValue;
        process.send(MotionValue);
        console.log('Motion State: %d', MotionValue);
    }
}, 500);

process.on('SIGINT', function() {
    // exit on ^C
    clearInterval(myInterval);
    console.log('Exiting.');
    process.exit(0);
});
