var Gpio = require('onoff').Gpio;
var led = new Gpio(17, 'out');

var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }

  if (key === '0') {
    led.writeSync(0);
    console.log("OFF");
  }

  if (key === '1') {
    led.writeSync(1);
    console.log("ON");
  }

});

