var five = require("johnny-five"); 

var board = new five.Board({ port: "/dev/ttyAMA0" });
board.on("ready", function() {

  // Motor 1
  // var motor = new five.Motor({
  //     pins: { pwm: 11 },
  //     register: { data: 8, clock: 4, latch: 12 },
  //     bits: { a: 2, b: 3 }
  //   }
  //  );
 
  // Motor 2
  var motor = new five.Motor({
      pins: { pwm: 3 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 1, b: 4 }
    }
   );

  board.repl.inject({
    motor: motor
  });

  motor.on("start", function(err, timestamp) {
    console.log("start", timestamp);
  });

  motor.on("stop", function(err, timestamp) {
    console.log("automated stop on timer", timestamp);
  });

  motor.on("brake", function(err, timestamp) {
    console.log("automated brake on timer", timestamp);
  });

  motor.on("forward", function(err, timestamp) {
    console.log("forward", timestamp);

    // demonstrate switching to reverse after 5 seconds
    board.wait(5000, function() {
      motor.reverse(150);
    });
  });

  motor.on("reverse", function(err, timestamp) {
    console.log("reverse", timestamp);

    // demonstrate stopping after 5 seconds
    board.wait(5000, function() {

      // Apply the brake for 500ms and call stop()
      motor.brake(500);
    });
  });

  // Start the motor at maximum speed
  motor.forward(255);

});
