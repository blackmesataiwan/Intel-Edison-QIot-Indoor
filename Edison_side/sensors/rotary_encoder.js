var rotaryEncoder = require('jsupm_rotaryencoder');
/**
 * Instantiate a Grove Rotary Encoder, using signal pins D2 and D3
 */
var myRotaryEncoder = new rotaryEncoder.RotaryEncoder(2, 3);
var lastValue = 0;

/**
 * Output data every second until interrupted
 */
var myInterval = setInterval(function() {
    var positionValue = myRotaryEncoder.position();
    if (lastValue !== positionValue) {
        lastValue = positionValue;
        process.send(positionValue);
        console.log('Position: %d', positionValue);
    }
}, 100);

process.on('SIGINT', function() {
    // exit on ^C
    clearInterval(myInterval);
    console.log('Exiting.');
    process.exit(0);
});
