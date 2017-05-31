var UVSensor = require('jsupm_guvas12d');
var g_GUVAS12D_AREF = 5.0; // analog voltage, usually 3.3 or 5.0

/**
 * Create the UV sensor objcet on analog pin A3
 */
var myUVSensor = new UVSensor.GUVAS12D(3, g_GUVAS12D_AREF);
var lastValue;

/**
 * Output data every second until interrupted
 */
var myInterval = setInterval(function() {
    var uvSensorVolts = myUVSensor.volts();
    var uvSensorValue = myUVSensor.intensity();
    if (lastValue !== uvSensorValue) {
        lastValue = uvSensorValue;
        process.send({volts: uvSensorVolts.toFixed(1),
            intensity: uvSensorValue.toFixed(1)});
        console.log('Volts: %d, Intensity: %d mW/m^2',
            uvSensorVolts, uvSensorValue);
    }
}, 1000);

process.on('SIGINT', function() {
    // exit on ^C
    clearInterval(myInterval);
    console.log('Exiting.');
    process.exit(0);
});
