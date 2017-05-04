var childProcess = require('child_process');
var os = require('os'); 
var networkInterfaces = os.networkInterfaces();

var lcd = childProcess.fork('./sensors/rgb_lcd.js');
var encoder = childProcess.fork('./sensors/rotary_encoder.js');
var th02 = childProcess.fork('./sensors/th02.js');
var button = childProcess.fork('./sensors/button.js');
var mositure = childProcess.fork('./sensors/moisture.js');
var light = childProcess.fork('./sensors/light.js');
var uv = childProcess.fork('./sensors/uv.js');
var pir = childProcess.fork('./sensors/PIR_Motion.js');

var relay = childProcess.fork('./sensors/relay.js');
var buizzer = childProcess.fork('./sensors/buzzer.js');
var serove = childProcess.fork('./sensors/servo.js');


var qiot = require('./lib/qiot');
var connection = new qiot(qiot.protocol.MQTT);
var connection_option = connection.readResource('./res/resourceinfo.json', './ssl/');
connection.connect(connection_option);
connection.on('connect', function(data) {
    lcd.send({ 
        command: 'write',
        setCursor: {
            row: 0,
            column: 0
        },
        strValue: "QIoT Connected!!"
    });
    showIP();
    connection.subscribeById("relay");
    connection.subscribeById("servo");
    connection.subscribeById("buzzer");
});

connection.on('message', function(data) {
    switch (data.id) {
        case "relay":
            console.log("relay : " + data.message.value);
            console.log("------------------------");
            relay.send({command: data.message.value});
            break;
        case "servo":
            console.log("servo : " + data.message.value);
            console.log("------------------------")
            serove.send(data.message.value);
            break;
        case "buzzer":
            var indata = JSON.parse(data.message.value);
            console.log("buzzer : " + data.message.value);
            console.log("------------------------")
            buizzer.send(indata);
            break;
        default:
            break;
    }
});

function showIP(){
    lcd.send({ 
        command: 'write',
        setCursor: {
            row: 1,
            column: 0
        },
        strValue: "IP:" + networkInterfaces.wlan0[0].address
    });
}

var choose = 0;
var tempHum = 0;

var encoderValue;
var th02Value;
var mositureValue;
var lightValue;
var uvValue;
var pirValue;

function showLCD(){
    switch (choose) {
        case 0:
            lcd.send({ 
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: "motion:"+pirValue
            });
            break;
        case 1:
            lcd.send({ 
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: "uv:"+uvValue.intensity+" mW/m^2"
            });
            break;
        case 2:
            lcd.send({ 
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: "light:"+lightValue+" lux"
            });
            break;
        case 3:
            lcd.send({ 
                command: 'write',
                setCursor: {
                    row: 1,
                    column: 0
                },
                strValue: "mositure:"+mositureValue.value
            });
            break;
        case 4:
            if(tempHum == 0){
                lcd.send({ 
                    command: 'write',
                    setCursor: {
                        row: 1,
                        column: 0
                    },
                    strValue: "Temperature:"+th02Value.temperature
                });
            }
            else{
                lcd.send({ 
                    command: 'write',
                    setCursor: {
                        row: 1,
                        column: 0
                    },
                    strValue: "Humidity:"+th02Value.humidity
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
    connection.publishById("motion", data);
    pirValue = data;
    showLCD();
});

uv.on('message', function(data) {
    connection.publishById("uv", data.intensity);
    uvValue = data;
    showLCD();

});

light.on('message', function(data) {
    connection.publishById("light", data);
    lightValue = data;
    showLCD();

});

mositure.on('message', function(data) {
    connection.publishById("moisture", data.value);
    mositureValue = data;
    showLCD();
});

button.on('message', function(data) {
    connection.publishById("button", data);
    tempHum = data;
    showLCD();
});

encoder.on('message', function(data) {
    connection.publishById("encoder", data);
    choose = data%6;
    if(choose<0) choose*=-1;
    showLCD();
});

th02.on('message', function(data){
    connection.publishById("temp", data.temperature);
    connection.publishById("hum", data.humidity);
    th02Value = data;
    showLCD();
});

lcd.send({ 
    command: 'write',
    setCursor: {
        row: 0,
        column: 0
    },
    strValue: "Botting......"
 });

process.on('SIGINT', function()
{
	console.log("Exiting........");
    lcd.kill();
    encoder.kill();
    th02.kill();
    button.kill();
    mositure.kill();
    light.kill();
    uv.kill();
    pir.kill();

    relay.kill();
    buizzer.kill();
    serove.kill();
	process.exit(0);
});