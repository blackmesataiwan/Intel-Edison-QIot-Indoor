var button = require('./sensors/button.js');
var sensorButton = new button();
sensorButton.on('message', function (value) {
    console.log("testt:" + value);
})

var light = require('./sensors/light.js');
var sensorLight = new light();
sensorLight.on('message', function (value) {
    console.log("light:" + value);
})

var moisture = require('./sensors/moisture.js');
var sensorMoisture = new moisture();
sensorMoisture.on('message', function (value, level) {
    console.log("Moisture:" + value + "\nLevel:" + level);
})

var pir = require('./sensors/PIR_Motion.js');
var sensorPIR = new pir();
sensorPIR.on('message', function (value) {
    console.log("PIR:" + value);
})

var relay = require('./sensors/relay.js');
var sensorRelay = new relay();
sensorRelay.relayCtrl('on');

var encoder = require('./sensors/rotary_encoder.js');
var sensorEncoder = new encoder();
sensorEncoder.on('message', function (value) {
    console.log("RTL:" + value);
})

var servo = require('./sensors/servo.js');
var sensorServo = new servo();
sensorServo.setAngle(60);

var th02 = require('./sensors/th02.js');
var sensorTH02 = new th02();
sensorTH02.on('message', function (tempValue, humValue) {
    console.log("temp:" + tempValue + "\nhum:" + humValue);
})

var uv = require('./sensors/uv.js');
var sensorUV = new uv();
sensorUV.on('message', function (volts, intensity) {
    console.log("volts:" + volts + "\nintensity:" + intensity);
})

var buzzer = require('./sensors/buzzer.js');
var sensorBuzzer = new buzzer();
sensorBuzzer.stopSound();
sensorBuzzer.setVolume(0.5);
sensorBuzzer.playSound(1,10000);

var lcd = require('./sensors/rgb_lcd.js');
var sensorLcd = new lcd();
//sensorLcd.setColor();
sensorLcd.clear();
sensorLcd.write('HIIII!!',0,0);