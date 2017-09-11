var upmBuzzer = require('jsupm_buzzer');

/**
 * Create the buzzer object using GPIO pin 5
 */
var sensorBuzzer = function () {
    this.myBuzzer = new upmBuzzer.Buzzer(5);
    this.chords = [upmBuzzer.BUZZER_DO, upmBuzzer.BUZZER_RE, upmBuzzer.BUZZER_MI,
    upmBuzzer.BUZZER_FA, upmBuzzer.BUZZER_SOL, upmBuzzer.BUZZER_LA,
    upmBuzzer.BUZZER_SI];
    this.myBuzzer.stopSound();
    this.setVolume = setVolume;
    this.playSound = playSound;
    this.stopSound = stopSound;
}

function setVolume(value){
    value = (typeof value !== 'undefined') ?  value: 0;
    this.myBuzzer.setVolume(value);
    console.log('volume: %d', value);
}

function playSound(tone, delay){
    tone = (typeof tone !== 'undefined') ?  tone: 0;
    delay = (typeof delay !== 'undefined') ?  delay: 0.5;
    this.myBuzzer.playSound(this.chords[tone], delay);
}

function stopSound(){
    this.myBuzzer.stopSound();
}
/*
process.on('message', function(data) {
    switch (data.command) {
        case 'setVolume':
            myBuzzer.setVolume(data.volume);
            console.log('volume: %d', data.volume);
            break;
        case 'playSound':
            myBuzzer.playSound(chords[data.tone], data.delay);
            break;
        case 'stopSound':
            myBuzzer.stopSound();
            break;
        default:
            break;
    }
});
*/

module.exports = sensorBuzzer;