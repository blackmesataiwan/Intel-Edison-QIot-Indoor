var upmButton = require('jsupm_button');
// Create the button object using GPIO pin 8
var button = new upmButton.Button(8);

var lestValue = 0;

// Output data every second until interrupted
var myInterval = setInterval(function()
{
	var buttonValue = button.value();
    if (lestValue != buttonValue){
        lestValue = buttonValue;
        process.send(buttonValue);
        console.log("Button State: " + buttonValue);
    }
}, 100);

// exit on ^C
process.on('SIGINT', function()
{
    clearInterval(myInterval);
    console.log("Exiting.");
    process.exit(0);
});

