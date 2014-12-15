const express = require('express');
const morgan  = require('morgan');

const app = express();
const host = '0.0.0.0'
const port = 5878;

app.use(morgan('common'));
app.use("/",express.static(__dirname + '/public'));

app.use('/api/rc1/:cmd', function(req, res) {
  console.log(req.params);
  res.status(200).json('OK');
});

app.use('/api/rc2/:mode/:cmd', function(req, res) {
  console.log(req.params);
  res.status(200).json('OK');
});

app.listen(port,host,function() {
  console.log("ready captain at port", port);
});

