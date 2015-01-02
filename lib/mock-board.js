const MockFirmata = require("../lib/mock-firmata.js"),
      five = require("johnny-five"), 
      Board = five.Board,
      Motor = five.Motor; 

module.exports.newBoard = function() {  
  return new Board({
    io: new MockFirmata(),
    debug: false,
    repl: false 
  });
};

