var childProcess = require('child_process');
var os = require('os');
var util = require('util');

var qiot = require('./lib/qiot');

var button = childProcess.fork('./sensors/button.js');
var buzzer = childProcess.fork('./sensors/buzzer.js');
var encoder = childProcess.fork('./sensors/rotary_encoder.js');
var lcd = childProcess.fork('./sensors/rgb_lcd.js');
var light = childProcess.fork('./sensors/light.js');
var mositure = childProcess.fork('./sensors/moisture.js');
var pir = childProcess.fork('./sensors/pir_motion.js');
var relay = childProcess.fork('./sensors/relay.js');
var serove = childProcess.fork('./sensors/servo.js');
var th02 = childProcess.fork('./sensors/th02.js');
var uv = childProcess.fork('./sensors/uv.js');

var networkInterfaces = os.networkInterfaces();

/**
 * Setup connection options
 */
var connection = new qiot(qiot.protocol.MQTT);
var connectionOption = connection.readResource(
    './res/resourceinfo.json', './ssl/');

/**
 * Show IP address in LCD
 */
function showIP() {
    lcd.send({
        command: 'write',
        setCursor: {
            row: 1,
            column: 0
        },
        strValue: util.format('IP:%s', networkInterfaces.wlan0[0].address)
    });
}

/**
 * Connect to QIoT Suite Lite and subscribe topics by resourceId
 */
connection.connect(connectionOption);
connection.on('connect', function(data) {
    lcd.send({
        command: 'write',
        setCursor: {
            row: 0,
            column: 0
        },
        strValue: 'QIoT Connected!!'
    });
    showIP();
    connection.subscribeById('relay');
    connection.subscribeById('servo');
    connection.subscribeById('buzzer');
});

/**
 * Receive data from QIoT Suite Lite.
 */
connection.on('message', function(data) {
    switch (data.id) {
        case 'relay':
            console.log('relay: %s', data.message.value);
            console.log('------------------------');
            relay.send({command: data.message.value});
            break;
        case 'servo':
            console.log('servo: %s', data.message.value);
            console.log('------------------------');
            serove.send(data.message.value);
            break;
        case 'buzzer':
            console.log('buzzer: %s', data.message.value);
            console.log('------------------------');
            buzzer.send(JSON.parse(data.message.value));
            break;
        default:
            break;
    }
});

var encoderPos = 0;
var th02Value;
var mositureValue;
var lightValue;
var uvValue;
var pirValue;

/**
 * Show sensor message on LCD
 */
function showLCD() {
    switch (encoderPos) {
        case 0:
            lcd.send({
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: util.format('motion:%s', pirValue)
            });
            break;
        case 1:
            lcd.send({
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: util.format('uv:%s mW/m^2', uvValue.intensity)
            });
            break;
        case 2:
            lcd.send({
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: util.format('light:%s lux', lightValue)
            });
            break;
        case 3:
            if (typeof mositureValue !== 'undefined') {
                lcd.send({
                    command: 'write',
                    setCursor: {
                        row: 1,
                        column: 0
                    },
                    strValue: util.format('mositure:%s', mositureValue.value)
                });
            }
            break;
        case 4:
            if (typeof th02Value !== 'undefined') {
                lcd.send({
                    command: 'write',
                    setCursor: {
                        row: 1,
                        column: 0
                    },
                    strValue: util.format('temp:%s hum:%s',
                        th02Value.temperature, th02Value.humidity)
                });
            }
            break;
        case 5:
            showIP();
            break;
        default:
            break;
    }
}

pir.on('message', function(data) {
    connection.publishById('motion', data);
    pirValue = data;
    showLCD();
});

uv.on('message', function(data) {
    connection.publishById('uv', data.intensity);
    uvValue = data;
    showLCD();
});

light.on('message', function(data) {
    connection.publishById('light', data);
    lightValue = data;
    showLCD();
});

mositure.on('message', function(data) {
    connection.publishById('moisture', data.value);
    mositureValue = data;
    showLCD();
});

button.on('message', function(data) {
    connection.publishById('button', data);
    showLCD();
});

encoder.on('message', function(data) {
    connection.publishById('encoder', data);
    encoderPos = data % 6;
    if (encoderPos < 0) {
        encoderPos *= -1;
    }
    showLCD();
});

th02.on('message', function(data) {
    connection.publishById('temp', data.temperature);
    connection.publishById('hum', data.humidity);
    th02Value = data;
    showLCD();
});

lcd.send({
    command: 'write',
    setCursor: {
        row: 0,
        column: 0
    },
    strValue: 'Connecting......'
});

process.on('SIGINT', function() {
    console.log('Exiting........');
    lcd.kill();
    encoder.kill();
    th02.kill();
    button.kill();
    mositure.kill();
    light.kill();
    uv.kill();
    pir.kill();

    relay.kill();
    buzzer.kill();
    serove.kill();
    process.exit(0);
});
