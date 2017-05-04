var LCD = require('jsupm_jhd1313m1');
var display = new LCD.Jhd1313m1 (0, 0x3E, 0x62);

// exit on ^C
process.on('SIGINT', function()
{
    console.log("Exiting.");
    process.exit(0);
});

process.on('message', function(data) {
    switch (data.command) {
        case "setColor":
            display.setColor(data.setColor.r, data.setColor.g, data.setColor.b);
            console.log("R:" + data.setColor.r + ", G:" + data.setColor.g + ", B:" + data.setColor.b); 
            break;
        
        case "clear":
            display.clear();
            console.log("LCD Clear!"); 
            break;

        case "write":
            display.setCursor(data.setCursor.row, data.setCursor.column);
            display.write(data.strValue+"            ");
            console.log("ROW:" + data.setCursor.row + ", CLUMN:" +data.setCursor.column + ", String:" + data.strValue); 
            break;
    
        default:
            break;
    } 
});

//process.send({ Hello: 'conan' });