//Load Grove Motion module
var grove_motion = require('jsupm_biss0001');
// Instantiate a Grove Motion sensor on GPIO pin D7
var myMotionObj = new grove_motion.BISS0001(7);

var lestValue;

// Output data every second until interrupted
var myInterval = setInterval(function()
{
	var MotionValue = myMotionObj.value();
    if (lestValue != MotionValue){
        lestValue = MotionValue;
        process.send(MotionValue);
        console.log("Motion State: " + MotionValue);
    }
}, 500);

// exit on ^C
process.on('SIGINT', function()
{
    clearInterval(myInterval);
    console.log("Exiting.");
    process.exit(0);
});

