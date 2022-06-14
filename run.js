const express = require('express');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('sever-socketID: '+socket.id);

    socket.on('chat message', (data) => {
        console.log('message: ' + JSON.stringify(data));
        socket.to(data.roomName).emit('receive', data);
      });

    socket.on('join', (roomName) => {
        socket.join(roomName);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});