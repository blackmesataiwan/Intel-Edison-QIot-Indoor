/**
 *   This sample code demonstrate indoor environment kit connected to QIoT
 *   Suite Lite by MQTTS protocol
 *   requirement:
 *   -- npm install
 *   run command: node boot.js
 */

var childProcess = require('child_process');
var os = require('os');
var readline = require('readline');
var sleep = require('sleep');

var lcd = childProcess.fork('./sensors/rgb_lcd.js');
var button = childProcess.fork('./sensors/button.js');
var networkInterfaces = os.networkInterfaces();
var ctrl;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showLCDInfo(word) {
    lcd.send({
        command: 'write',
        setCursor: {
            row: 0,
            column: 0
        },
        strValue: word
    });
}

var infomation = setInterval(function() {
    showLCDInfo('Please input ');
    sleep.sleep(1);
    showLCDInfo('resource file');
    sleep.sleep(1);
    showLCDInfo('before');
    sleep.sleep(1);
    showLCDInfo('clicking button!!!!');
}, 500);

lcd.send({
    command: 'write',
    setCursor: {
        row: 0,
        column: 0
    },
    strValue: 'Input res file!!'
});

lcd.send({
    command: 'write',
    setCursor: {
        row: 1,
        column: 0
    },
    strValue: 'IP:' + networkInterfaces.wlan0[0].address
});

rl.question('Please input resource file before clicking button!', function(answer) {
    // rl.close();
});

rl.on('close', function() {
    console.log('Exiting........');
    lcd.kill('SIGINT');
    button.kill('SIGINT');
    ctrl.kill('SIGINT');
    process.exit(0);
});

button.on('message', function(data) {
    if (data) {
        clearInterval(infomation);
        console.log('Starting........');
        showLCDInfo('Starting........');
        lcd.kill('SIGINT');
        button.kill('SIGINT');
        ctrl = childProcess.fork('./ctrl.js');
    }
});

process.on('SIGINT', function() {
    console.log('Exiting........');
    lcd.kill('SIGINT');
    button.kill('SIGINT');
    ctrl.kill('SIGINT');
    process.exit(0);
});
