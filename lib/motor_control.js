const events = require('events');
const util = require("util");
const five = require("johnny-five"); 

const MOTOR_LEFT = 11;
const MOTOR_RIGHT = 3;

const STOPPED = 0;
const FULL_SPEED = 255;
const HALF_SPEED = 128;
const QUARTER_SPEED = 64;

// Constructor
function MotorControl(board) {
  events.EventEmitter.call(this);

  var that = this;

  this.board = board;
  this.board.on("ready", function() {

    // Motor 1
    that.left = new five.Motor({
         pins: { pwm: MOTOR_LEFT },
         register: { data: 8, clock: 4, latch: 12 },
         bits: { a: 2, b: 3 }
       }
    );
   
    // Motor 2
    that.right = new five.Motor({
	pins: { pwm: MOTOR_RIGHT },
	register: { data: 8, clock: 4, latch: 12 },
	bits: { a: 1, b: 4 }
      }
    );

    that.emit('ready',that);

//  that.board.repl.inject({
//    left: left,
//    right: right
//  });
//
 });
};

util.inherits(MotorControl, events.EventEmitter);

// class methods
MotorControl.prototype.stop = function() {
  this.left.stop();
  this.right.stop();
};

MotorControl.prototype.north = function() {
  // Start the motor at maximum speed
  this.left.forward(FULL_SPEED);
  this.right.forward(FULL_SPEED);
};

MotorControl.prototype.north_west = function() {
  this.left.forward(HALF_SPEED);
  this.right.forward(FULL_SPEED);
};

MotorControl.prototype.north_east = function() {
  this.left.forward(FULL_SPEED);
  this.right.forward(HALF_SPEED);
};

MotorControl.prototype.west = function() {
  this.left.forward(STOPPED);
  this.right.forward(FULL_SPEED);
};

MotorControl.prototype.east = function() {
  this.left.forward(FULL_SPEED);
  this.right.forward(STOPPED);
};

MotorControl.prototype.south = function() {
  // Start the motor reverse at half maximum speed
  this.left.reverse(FULL_SPEED);
  this.right.reverse(FULL_SPEED);
};

MotorControl.prototype.south_west = function() {
  this.left.reverse(HALF_SPEED);
  this.right.reverse(FULL_SPEED);
};

MotorControl.prototype.south_east = function() {
  this.left.reverse(FULL_SPEED);
  this.right.reverse(HALF_SPEED);
};

// export the class
module.exports = MotorControl;
