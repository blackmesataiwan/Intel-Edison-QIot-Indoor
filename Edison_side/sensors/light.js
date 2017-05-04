var groveSensor = require('jsupm_grove');

// Create the light sensor object using AIO pin 2
var light = new groveSensor.GroveLight(2);

var lestValue = 0;

// Output data every second until interrupted
var myInterval = setInterval(function()
{
	var lightValue = light.value();
    if (lestValue != lightValue){
        lestValue = lightValue;
        process.send(lightValue);
        console.log("Light: " + lightValue + "lux");
    }
}, 1000);

// exit on ^C
process.on('SIGINT', function()
{
    clearInterval(myInterval);
    console.log("Exiting.");
    process.exit(0);
});

