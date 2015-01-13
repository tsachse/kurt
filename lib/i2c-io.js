var Emitter = require("events").EventEmitter;
var tick = global.setImmediate || process.nextTick;
var i2c = require('i2c-bus');

var modes = Object.freeze({
});

var modesMapping = {
};


var pinMappings = [
;


var pinModes = []; 

var boards = [];
var reporting = [];
var _i2c;

tick(function read() {
  tick(read);
  var board;

  if (boards.length && reporting.length) {
    board = boards[0];

    reporting.forEach(function(report) {
      report.method(report.port, function(result) {
        if (!result.err) {
          var val = +result.value;

          if (report.scale) {
            val = report.scale(val);
          }

          board.pins[report.index].value = val;
          board.emit(report.event, val);
        }

      });
    });
  }
});

function I2CIO(opts) {
  Emitter.call(this);

  if (!(this instanceof I2CIO)) {
    return new I2CIO(opts);
  }

  this.name = "I2C-IO";

  this.pins = [];

  boards[0] = this;

  this.defaultLed = 13;
  this.isReady = false;
  tick(function() {
    this.isReady = true;
    this.emit("connect");
    this.emit("ready");
  }.bind(this));
}

I2CIO.reset = function() {
  reporting.length = 0;
};

I2CIO.prototype = Object.create(Emitter.prototype, {
  constructor: {
    value: I2CIO
  },
  MODES: {
    value: modes
  },
  HIGH: {
    value: 1
  },
  LOW: {
    value: 0
  }
});

I2CIO.prototype.normalize = function(pin) {
  return pin;
};


I2CIO.prototype.pinMode = function(pin, mode) {
  var pinIndex;
  var port;

  return this;
};


I2CIO.prototype.sendI2CConfig = function() {
  if (_i2c === undefined) {
    _i2c = i2c.openSync(1);
  }
  return this;
};


I2CIO.prototype.sendI2CWriteRequest = function(address, bytes) {
  var i2cWriteBuffer = new Buffer(bytes);

  _i2c.i2cWriteSync(address, i2cWriteBuffer.length, i2cWriteBuffer);
  return this;
};

I2CIO.prototype.sendI2CReadRequest = function(address, length, cb) {
  var i2cReadBuffer = new Buffer(length);
  _i2c.i2cRead(address, length, i2cReadBuffer, function(i2cError, i2cNumBytes, i2cReadBuffer) {
    if (i2cError) {
      this.emit("error", i2cError);
      return;
    }
    cb(i2cReadBuffer);

  });
  return this;
};


I2CIO.prototype.i2cConfig = I2CIO.prototype.sendI2CConfig 
I2CIO.prototype.i2cWrite  = I2CIO.prototype.sendI2CWriteRequest;

I2CIO.prototype.i2cRead   = function(address, cmd, length, cb) {
  var i2cReadBuffer = new Buffer(length);
  _i2c.readiI2cBlock(address, cmd, length, i2cReadBuffer, function(i2cError, i2cNumBytes, i2cReadBuffer) {
    if (i2cError) {
      this.emit("error", i2cError);
      return;
    }
    cb(i2cReadBuffer);

  });

  return this;
}

// Not Supported
[
  "pulseIn",
  "pulseOut",
  "queryPinState",
  "_sendOneWireRequest",
  "_sendOneWireSearch",
  "sendOneWireWriteAndRead",
  "sendOneWireDelay",
  "sendOneWireDelay",
  "sendOneWireReset",
  "sendOneWireRead",
  "sendOneWireSearch",
  "sendOneWireAlarmsSearch",
  "sendOneWireConfig",
  "stepperConfig",
  "stepperStep"
].forEach(function(method) {
  I2CIO.prototype[method] = function() {
    throw method + " is not yet implemented.";
  };

});

module.exports = I2CIO;
