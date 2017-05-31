var groveSensor = require('jsupm_grove');

/**
 * Create the relay switch object using GPIO pin 4
 */
var relay = new groveSensor.GroveRelay(4);

process.on('message', function(data) {
    switch (data.command) {
        case 'on':
        case 1:
            relay.on();
            console.log('%s is on', relay.name());
            break;
        case 'off':
        case 0:
            relay.off();
            console.log('%s is off', relay.name());
            break;
        default:
            break;
    }
});

process.on('SIGINT', function() {
    // exit on ^C
    console.log('Exiting.');
    process.exit(0);
});
