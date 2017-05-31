var LCD = require('jsupm_jhd1313m1');
var display = new LCD.Jhd1313m1(0, 0x3E, 0x62);

process.on('message', function(data) {
    switch (data.command) {
        case 'setColor':
            display.setColor(data.setColor.r, data.setColor.g, data.setColor.b);
            break;
        case 'clear':
            display.clear();
            break;
        case 'write':
            display.setCursor(data.setCursor.row, data.setCursor.column);
            display.write(data.strValue + '            ');
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
