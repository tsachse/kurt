const express = require('express');
const morgan  = require('morgan');
const five = require("johnny-five");
const MotorControl = require('./lib/motor_control');

// ein Board zu testen
// const MockBoard = require("./lib/mock-board");
// var board = MockBoard.newBoard();

// das reale Board
var board = new five.Board({ port: "/dev/ttyAMA0" });

var mc = new MotorControl(board);

const app = express();
const host = '0.0.0.0'
const port = 5878;

app.use(morgan('common'));
app.use("/",express.static(__dirname + '/public'));

app.use('/api/rc1/:cmd', function(req, res) {
  console.log(req.params);
  switch(req.params.cmd) {
    case 'N'   : mc.north(); break;
    case 'NW'  : mc.north_west(); break;
    case 'NO'  : mc.north_east(); break;
    case 'W'   : mc.west(); break;
    case 'O'   : mc.east(); break;
    case 'S'   : mc.south(); break;
    case 'SW'  : mc.south_west(); break;
    case 'SO'  : mc.south_east(); break;
    case 'STOP': mc.stop(); break;
  }
  res.status(200).json('OK');
});

app.use('/api/rc2/:mode/:cmd', function(req, res) {
  console.log(req.params);
  res.status(200).json('OK');
});

app.listen(port,host,function() {
  console.log("remote control at port", port);
});

mc.on("ready", function(board) {
  console.log("motor shield ready");

  mc.left.on("start", function(err, timestamp) {
    console.log("left: start", timestamp);
  });
  mc.left.on("stop", function(err, timestamp) {
    console.log("left: automated stop on timer", timestamp);
  });
  mc.left.on("brake", function(err, timestamp) {
    console.log("left: automated brake on timer", timestamp);
  });
  mc.left.on("forward", function(err, timestamp) {
    console.log("left: forward", timestamp);
  });
  mc.left.on("reverse", function(err, timestamp) {
    console.log("left: reverse", timestamp);
  });

  mc.right.on("start", function(err, timestamp) {
    console.log("right: start", timestamp);
  });
  mc.right.on("stop", function(err, timestamp) {
    console.log("right: automated stop on timer", timestamp);
  });
  mc.right.on("brake", function(err, timestamp) {
    console.log("right: automated brake on timer", timestamp);
  });
  mc.right.on("forward", function(err, timestamp) {
    console.log("right: forward", timestamp);
  });
  mc.right.on("reverse", function(err, timestamp) {
    console.log("right: reverse", timestamp);
  });
});
