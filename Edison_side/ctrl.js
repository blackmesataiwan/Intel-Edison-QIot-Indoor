var childProcess = require('child_process');
var connection = childProcess.fork('./connection.js');

var os = require('os');
var util = require('util');
var qiot = require('./lib/qiot');
var networkInterfaces = os.networkInterfaces();

var sensorButton = require('./sensors/button.js');
var button = new sensorButton();

var sensorLight = require('./sensors/light.js');
var light = new sensorLight();

var sensorMoisture = require('./sensors/moisture.js');
var moisture = new sensorMoisture();

var sensorPIR = require('./sensors/PIR_Motion.js');
var pir = new sensorPIR();

var sensorRelay = require('./sensors/relay.js');
var relay = new sensorRelay();

var sensorEncoder = require('./sensors/rotary_encoder.js');
var encoder = new sensorEncoder();

var sensorServo = require('./sensors/servo.js');
var servo = new sensorServo();

var sensorTH02 = require('./sensors/th02.js');
var th02 = new sensorTH02();

var sensorUV = require('./sensors/uv.js');
var uv = new sensorUV();

var sensorBuzzer = require('./sensors/buzzer.js');
var buzzer = new sensorBuzzer();

var sensorLcd = require('./sensors/rgb_lcd.js');
var lcd = new sensorLcd();


/**
 * Show IP address in LCD
 */

function showIP() {
    try {
        lcd.write(util.format('IP:%s', networkInterfaces.wlan0[0].address),1,0);
    } catch (error) {
        lcd.write("NO WIFI IP!!",1,0);
    }
    
}

/**
 * Show sensor message on LCD
 */

var encoderPos = 0;
var th02Value;
var moistureValue = 0;
var lightValue;
var uvValue;
var pirValue;

function showLCD() {
    switch (encoderPos) {
        case 0:
            lcd.write(util.format('motion:%s', pirValue),1,0);
            break;
        case 1:
            lcd.write(util.format('uv:%s mW/m^2', uvValue.intensity),1,0);
            break;
        case 2:
            lcd.write(util.format('light:%s lux', lightValue),1,0);
            break;
        case 3:
            if (typeof moistureValue !== 'undefined') {
                lcd.write(util.format('mositure:%s', moistureValue.value),1,0);
            }
            break;
        case 4:
            if (typeof th02Value !== 'undefined') {
                lcd.write(util.format('temp:%s hum:%s',
                        th02Value.temperature, th02Value.humidity),1,0);
            }
            break;
        case 5:
            showIP();
            break;
        default:
            break;
    }
}

/**
 * Receive data from QIoT Suite Lite.
 */
connection.on('message', function(data) {
    switch (data.id) {
        case 'relay':
            console.log('relay: %s', data.message.value);
            console.log('------------------------');
            relay.relayCtrl(data.message.value);
            //relay.send({command: data.message.value});
            break;
        case 'servo':
            console.log('servo: %s', data.message.value);
            console.log('------------------------');
            servo.setAngle(data.message.value);
            //serove.send(data.message.value);
            break;
        case 'buzzer':
            console.log('buzzer: %s', data.message.value);
            console.log('------------------------');
            var dataJson = JSON.parse(data.message.value);
            switch (dataJson.command) {
                case 'setVolume':
                    buzzer.setVolume(dataJson.volume);
                    //myBuzzer.setVolume(data.volume);
                    console.log('volume: %d', dataJson.volume);
                    break;
                case 'playSound':
                    buzzer.playSound(dataJson.tone, dataJson.delay);
                    //myBuzzer.playSound(chords[data.tone], data.delay);
                    break;
                case 'stopSound':
                    buzzer.stopSound();
                    console.log("STOP!!!!!!!");
                    //myBuzzer.stopSound();
                    break;
                default:
                    break;
            }
            //buzzer.send(JSON.parse(data.message.value));
            break;
        /***************************/
        case 'lcd':
            lcd.write(data.message,0,0);
            break;
        case 'showIP':
            showIP();
            break;
        default:
            break;
    }
});

pir.on('message', function(data) {
    connection.send({id: 'motion', value: data});
    //connection.publishById('motion', data);
    pirValue = data;
    showLCD();
});

uv.on('message', function(volts, intensity) {
    var data = { volts: volts, intensity: intensity };
    connection.send({id: 'uv', value: data.intensity});
    //connection.publishById('uv', data.intensity);
    uvValue = data;
    showLCD();
});

light.on('message', function(data) {
    connection.send({id: 'light', value: data});
    //connection.publishById('light', data);
    lightValue = data;
    showLCD();
});

moisture.on('message', function(value, level) {
    var data = { value: value, level: level };
    connection.send({id: 'moisture', value: data.value});
    //connection.publishById('moisture', data.value);
    moistureValue = data;
    showLCD();
});

button.on('message', function(data) {
    connection.send({id: 'button', value: data});
    //connection.publishById('button', data);
    showLCD();
});

encoder.on('message', function(data) {
    connection.send({id: 'encoder', value: data});
    //connection.publishById('encoder', data);
    encoderPos = data % 6;
    if (encoderPos < 0) {
        encoderPos *= -1;
    }
    showLCD();
});

th02.on('message', function(tempValue, humValue) {
    var data = { temperature: tempValue, humidity: humValue };
    connection.send({id: 'temp', value: data.temperature});
    connection.send({id: 'hum', value: data.humidity});
    //connection.publishById('temp', data.temperature);
    //connection.publishById('hum', data.humidity);
    th02Value = data;
    showLCD();
});

lcd.write('Connecting......',0,0);

process.on('SIGINT', function() {
    console.log('Exiting........');
    connection.kill();
    process.exit(0);
});

/*
button.on('message', function (value) {
    console.log("testt:" + value);
})

light.on('message', function (value) {
    console.log("light:" + value);
})

moisture.on('message', function (value, level) {
    console.log("Moisture:" + value + "\nLevel:" + level);
})

pir.on('message', function (value) {
    console.log("PIR:" + value);
})



encoder.on('message', function (value) {
    console.log("RTL:" + value);
})



th02.on('message', function (tempValue, humValue) {
    console.log("temp:" + tempValue + "\nhum:" + humValue);
})

uv.on('message', function (volts, intensity) {
    console.log("volts:" + volts + "\nintensity:" + intensity);
})



lcd.clear();
lcd.write('HIIII!!',0,0);
*/