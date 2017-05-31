// Load Grove Moisture module
var groveMoisture = require('jsupm_grovemoisture');

/**
 * Create the moisture sensor object on analog pin A0
 */
var myMoistureObj = new groveMoisture.GroveMoisture(1);
var lastValue;

/**
 * Output data every second until interrupted
 */
var myInterval = setInterval(function() {
    // Moisture Values (approximate):
    // 0-300,   sensor in air or dry soil
    // 300-600, sensor in humid soil
    // 600+,    sensor in wet soil or submerged in water
    var moistureLevel;
    var moistureValue = parseInt(myMoistureObj.value());
    if (lastValue !== moistureValue) {
        lastValue = moistureValue;
        if (moistureValue >= 0 && moistureValue < 300) {
            moistureLevel = 'Dry';
        } else if (moistureValue >= 300 && moistureValue < 600) {
            moistureLevel = 'Moist';
        } else {
            moistureLevel = 'Wet';
        }
        process.send({value: moistureValue, result: moistureLevel});
        console.log('Moisture value: %d, level: %s',
            moistureValue, moistureLevel);
    }
}, 1000);

process.on('SIGINT', function() {
    // exit on ^C
    clearInterval(myInterval);
    console.log('Exiting.');
    process.exit(0);
});
