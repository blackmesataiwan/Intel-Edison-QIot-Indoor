var upmButton = require('jsupm_button');

/**
 * Create the button object using GPIO pin 8
 */
var button = new upmButton.Button(8);
var lastValue = 0;

/**
 * Output data every second until interrupted
 */
var myInterval = setInterval(function() {
    var buttonValue = button.value();
    if (lastValue !== buttonValue) {
        lastValue = buttonValue;
        process.send(buttonValue);
        console.log('Button State: %d', buttonValue);
    }
}, 100);

process.on('SIGINT', function() {
    // exit on ^C
    clearInterval(myInterval);
    console.log('Exiting.');
    process.exit(0);
});
