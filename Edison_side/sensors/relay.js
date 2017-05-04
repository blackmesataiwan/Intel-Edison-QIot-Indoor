var groveSensor = require('jsupm_grove');

// Create the relay switch object using GPIO pin 0
var relay = new groveSensor.GroveRelay(0);

process.on('message', function(data) {
    switch (data.command) {
        case "on"||1:
            relay.on();
            console.log(relay.name() + " is on"); 
            break;
        
        case "off"||0:
            relay.off();
            console.log(relay.name() + " is off"); 
            break;
    
        default:
            break;
    } 
});

// exit on ^C
process.on('SIGINT', function()
{
    console.log("Exiting.");
    process.exit(0);
});

