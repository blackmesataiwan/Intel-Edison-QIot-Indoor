var qiot = require('./lib/qiot');

/**
 * Setup connection options
 */
var connection = new qiot(qiot.protocol.MQTT);
var connectionOption = connection.readResource(
    './res/resourceinfo.json', './ssl/');

connection.connect(connectionOption);
connection.on('connect', function(data) {
    process.send({id: 'lcd',message: 'QIoT Connected!!'});
    process.send({id: 'showIP'});
    connection.subscribeById('relay');
    connection.subscribeById('servo');
    connection.subscribeById('buzzer');
});

connection.on('message', function(data) {
    switch (data.id) {
        case 'relay':
            process.send({id: data.id,message: data.message});
            break;
        case 'servo':
            process.send({id: data.id,message: data.message});
            break;
        case 'buzzer':
            process.send({id: data.id,message: data.message});
            break;
        default:
            break;
    }
});

process.on('message', function(data) {
    connection.publishById(data.id, data.value);
});

process.on('SIGINT', function() {
    console.log('connect end!!');
    process.exit(0);
});