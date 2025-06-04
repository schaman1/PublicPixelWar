var express = require('express');
var router = express.Router();

//socket.io session
function setSocketIo(socketIo) {
  io = socketIo;

  // Configure socket.io events
  io.on('connection', (socket) => {
    console.log("Socket.io connected");
    io.emit('reload',{Text: "Maintenance en cours, merci de patienter."});
  });
};

module.exports = { router, setSocketIo };
