var upmBuzzer = require("jsupm_buzzer");
// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(5);
var chords = [];
chords.push(upmBuzzer.BUZZER_DO);
chords.push(upmBuzzer.BUZZER_RE);
chords.push(upmBuzzer.BUZZER_MI);
chords.push(upmBuzzer.BUZZER_FA);
chords.push(upmBuzzer.BUZZER_SOL);
chords.push(upmBuzzer.BUZZER_LA);
chords.push(upmBuzzer.BUZZER_SI);
var chordIndex = 0;
// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});
process.on('message', function(data) {
    switch (data.command) {
        case "setVolume":
            myBuzzer.setVolume(data.volume);
            console.log("volume:" + data.volume); 
            break;
        
        case "playSound":
            myBuzzer.playSound(chords[data.tone], data.dely)
            break;

        case "stopSound":
            myBuzzer.stopSound(); 
            break;
    
        default:
            break;
    } 
});

//process.send({ Hello: 'conan' });