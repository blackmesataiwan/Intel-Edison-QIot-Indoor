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

var lcd = childProcess.fork('./sensors_old/rgb_lcd.js');
var button = childProcess.fork('./sensors_old/button.js');
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

try {
    for (var inter in networkInterfaces) {
        if (inter != 'lo'){
            for (var count in networkInterfaces[inter]){
                if (networkInterfaces[inter][count].address != 'undefined'){
                    lcd.send({
                        command: 'write',
                        setCursor: {
                            row: 1,
                            column: 0
                        },
                        strValue: 'IP:' + networkInterfaces[inter][count].address
                    });
                    break;
                }
            }
            break;
        }
        else{
            lcd.send({
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: 'NO ANY IP!!'
            });
        }
    }
} catch (error) {
    lcd.send({
        command: 'write',
        setCursor: {
            row: 1,
            column: 0
        },
        strValue: 'NO IP!!'
    });
}

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
        ctrl.on('close', function(err) {
            console.log('ctrl_err : ' + err);
            ctrl.kill('SIGINT');
            process.exit(0);
        });
    }
});

process.on('SIGINT', function() {
    console.log('Exiting........');
    lcd.kill('SIGINT');
    button.kill('SIGINT');
    ctrl.kill('SIGINT');
    process.exit(0);
});
    