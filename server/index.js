// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// //DB setup
mongoose.connect('mongodb://mikjail:password@ds115579.mlab.com:15579/auth');  

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection with Mongodb Successful!");
});

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

// Server Setup
const port  = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port", port);
 