const events = require('events');
const util = require("util");

const STOPPED = 0;
const FULL_SPEED = 255;
const HALF_SPEED = 128;
const QUARTER_SPEED = 64;

// Constructor
function MotorControl(left_motor, right_motor) {
  events.EventEmitter.call(this);

  this.left  = left_motor;
  this.right = right_motor;
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
