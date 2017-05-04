var rotaryEncoder = require("jsupm_rotaryencoder");
// Instantiate a Grove Rotary Encoder, using signal pins D2 and D3
var myRotaryEncoder = new rotaryEncoder.RotaryEncoder(2, 2+1);

var lestValue = 0;

// Output data every second until interrupted
var myInterval = setInterval(function()
{
	var positionValue = myRotaryEncoder.position();
    if (lestValue != positionValue){
        lestValue = positionValue;
        process.send(positionValue);
        console.log("Position: " + positionValue);
    }
}, 100);

// exit on ^C
process.on('SIGINT', function()
{
    clearInterval(myInterval);
    console.log("Exiting.");
    process.exit(0);
});

