var th02Obj = require('jsupm_th02');
var bar = new th02Obj.TH02();

/**
 * Output data every second until interrupted
 */
setInterval(function() {
    var temp = bar.getTemperature();
    var hum = bar.getHumidity();
    if (temp < -40) {
        temp = 0;
    }
    if (hum < 0) {
        hum = 0;
    }
    process.send({
        temperature: temp.toFixed(1),
        humidity: hum.toFixed(1)
    });
    console.log('Temperature: %s Celsius', temp.toFixed(1));
    console.log('Humidity: %s', hum.toFixed(1));
}, 500);

process.on('SIGINT', function() {
    // exit on ^C
    bar = null;
    th02Obj.cleanUp();
    th02Obj = null;
    console.log('Exiting.');
    process.exit(0);
});
