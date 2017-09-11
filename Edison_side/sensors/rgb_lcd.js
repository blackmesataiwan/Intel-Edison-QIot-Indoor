var LCD = require('jsupm_jhd1313m1');

var sensorLCD = function () {
    this.display =  new LCD.Jhd1313m1(0, 0x3E, 0x62);
    this.setColor = setColor;
    this.clear = clear;
    this.write = write;
}

function setColor(r,g,b){
    r = (typeof r !== 'undefined') ?  r: 0;
    g = (typeof g !== 'undefined') ?  g: 0;
    b = (typeof b !== 'undefined') ?  b: 0;
    this.display.setColor(r, g, b);
}

function clear(){
    this.display.clear();
}

function write(strValue, row, column){
    row = (typeof row !== 'undefined') ?  row: 0;
    column = (typeof colunm !== 'undefined') ?  column: 0;
    this.display.setCursor(row, column);
    this.display.write(strValue + '            ');
}

/*
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
*/

module.exports = sensorLCD;
