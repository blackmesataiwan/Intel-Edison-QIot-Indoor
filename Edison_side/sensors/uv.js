var UVSensor = require('jsupm_guvas12d');

// analog voltage, usually 3.3 or 5.0
var g_GUVAS12D_AREF = 5.0;

// Instantiate a UV sensor on analog pin A3
var myUVSensor = new UVSensor.GUVAS12D(3, g_GUVAS12D_AREF);

var lestValue;

// Output data every second until interrupted
var myInterval = setInterval(function()
{
	var uvSensorVolts = myUVSensor.volts();
    var uvSensorValue = myUVSensor.intensity();
    if (lestValue != uvSensorValue){
        lestValue = uvSensorValue;
        process.send({volts: uvSensorVolts.toFixed(1), intensity: uvSensorValue.toFixed(1)});
        console.log("Volts: " + uvSensorVolts + ", Intensity: " + uvSensorValue + " mW/m^2");
    }
}, 1000);

// exit on ^C
process.on('SIGINT', function()
{
    clearInterval(myInterval);
    console.log("Exiting.");
    process.exit(0);
});

