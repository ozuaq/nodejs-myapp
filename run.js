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

    socket.on('rooms', () => {
      console.log('receive rooms');
      socket.emit('chat-top', {rooms: getActiveRooms(io)});
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

function getActiveRooms(io) {
  const arr = Array.from(io.sockets.adapter.rooms);
  const filtered = arr.filter(room => !room[1].has(room[0]))
  let rooms = [];
  for(const room of filtered){
    rooms.push({roomName: room[0], activeNumber: room[1].size})
  }
  console.log(rooms);
  return rooms;
}