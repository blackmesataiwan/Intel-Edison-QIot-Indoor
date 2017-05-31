var upmBuzzer = require('jsupm_buzzer');

/**
 * Create the buzzer object using GPIO pin 5
 */
var myBuzzer = new upmBuzzer.Buzzer(5);
var chords = [upmBuzzer.BUZZER_DO, upmBuzzer.BUZZER_RE, upmBuzzer.BUZZER_MI,
    upmBuzzer.BUZZER_FA, upmBuzzer.BUZZER_SOL, upmBuzzer.BUZZER_LA,
    upmBuzzer.BUZZER_SI];
myBuzzer.stopSound();

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

process.on('SIGINT', function() {
    // exit on ^C
    console.log('Exiting...');
    process.exit(0);
});
