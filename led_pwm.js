var readline = require('readline');
var piblaster = require('pi-blaster.js');  

var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Helligkeit %> ');
rl.prompt();
rl.on('line', function(brightness) {
  if (brightness === "stop") rl.close();
  if (brightness.length === 0 || isNaN(brightness)) {
    console.log('???');
  } else {
    piblaster.setPwm(17, brightness / 100);
    console.log('Brightness set to: ' + brightness + '%');
  }
  rl.prompt();
}).on('close',function(){
  process.exit(0);
});
