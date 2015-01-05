const MotorControl = require('../lib/motor_control'),
      MockBoard = require("../lib/mock-board.js"),
      five = require("johnny-five"),
      sinon = require("sinon");

const MOTOR_LEFT = 11;
const MOTOR_RIGHT = 3;

const STOPPED = 0;
const FULL_SPEED = 255;
const HALF_SPEED = 128;
const QUARTER_SPEED = 64;

process.on('uncaughtException', function(err) {
  console.error(err.stack);
});

exports["Motor Control"] = {
  setUp: function(done) {
    //this.board = newBoard();
    this.board = MockBoard.newBoard();
    this.spy = sinon.spy(this.board.io, "analogWrite");
    this.mc = new MotorControl(this.board);
    // Motor 1
    this.mc.left = new five.Motor({
         board: this.board,
         pins: { pwm: MOTOR_LEFT },
         register: { data: 8, clock: 4, latch: 12 },
         bits: { a: 2, b: 3 }
       }
    );
   
    // Motor 2
    this.mc.right = new five.Motor({
        board: this.board,
	pins: { pwm: MOTOR_RIGHT },
	register: { data: 8, clock: 4, latch: 12 },
	bits: { a: 1, b: 4 }
      }
    );
    done();
  },

  stopTest: function(test) {
    test.expect(2);

    this.mc.stop();
    test.ok(this.spy.calledWith(MOTOR_LEFT,STOPPED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,STOPPED));
    this.spy.reset();

    test.done();
  },

  directionNorthTest: function(test) {
    test.expect(2);

    this.mc.north();
    test.ok(this.spy.calledWith(MOTOR_LEFT,FULL_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,FULL_SPEED));
    this.spy.reset();

    test.done();
  },
  
  directionNorthWestTest: function(test) {
    test.expect(2);

    this.mc.north_west();
    test.ok(this.spy.calledWith(MOTOR_LEFT,HALF_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,FULL_SPEED));
    this.spy.reset();

    test.done();
  },

  directionNorthEast: function(test) {
    test.expect(2);

    this.mc.north_east();
    test.ok(this.spy.calledWith(MOTOR_LEFT,FULL_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,HALF_SPEED));
    this.spy.reset();

    test.done();
  },

  directionWestTest: function(test) {
    test.expect(2);

    this.mc.west();
    test.ok(this.spy.calledWith(MOTOR_LEFT,STOPPED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,FULL_SPEED));
    this.spy.reset();

    test.done();
  },

  directionEast: function(test) {
    test.expect(2);

    this.mc.east();
    test.ok(this.spy.calledWith(MOTOR_LEFT,FULL_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,STOPPED));
    this.spy.reset();

    test.done();
  },

  directionSouthTest: function(test) {
    test.expect(2);

    this.mc.south();
    test.ok(this.spy.calledWith(MOTOR_LEFT,FULL_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,FULL_SPEED));
    this.spy.reset();

    test.done();
  },

  directionSouthWestTest: function(test) {
    test.expect(2);

    this.mc.south_west();
    test.ok(this.spy.calledWith(MOTOR_LEFT,HALF_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,FULL_SPEED));
    this.spy.reset();

    test.done();
  },

  directionSouthEastTest: function(test) {
    test.expect(2);

    this.mc.south_east();
    test.ok(this.spy.calledWith(MOTOR_LEFT,FULL_SPEED));
    test.ok(this.spy.calledWith(MOTOR_RIGHT,HALF_SPEED));
    this.spy.reset();

    test.done();
  },

};
