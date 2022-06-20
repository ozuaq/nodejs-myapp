const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const roomToMessages = new Map();

io.on("connection", (socket) => {
  console.log("sever-socketID: " + socket.id);

  socket.on("chat message", (data) => {
    // console.log('message: ' + JSON.stringify(data));
    roomToMessages
      .get(data.roomName)
      .push({ userName: data.userName, message: data.message });
    data.activeNumber = getRoomToActiveNumber(io).get(data.roomName);
    socket.to(data.roomName).emit("receive", data);
  });

  socket.on("join", (data) => {
    socket.join(data.roomName);
    // console.log('join'+data.userId);
    if (!roomToMessages.has(data.roomName)) {
      roomToMessages.set(data.roomName, []);
    }
    // userId messages activeNumber
    socket.emit("init", { userId: data.userId, messages: roomToMessages.get(data.roomName), activeNumber: getRoomToActiveNumber(io).get(data.roomName) });
  });

  socket.on("rooms", () => {
    // console.log('receive rooms');
    let rooms = [];
    for (let [roomName, activeNumber] of getRoomToActiveNumber(io)) {
      rooms.push({ roomName: roomName, activeNumber: activeNumber });
    }
    socket.emit("chat-top", { rooms: rooms });
  });

  socket.on("disconnect", () => {
    console.log("アクティブなルーム(処理前)は" + roomToMessages.size);
    for (const room of roomToMessages.keys()) {
      if (!getRoomToActiveNumber(io).has(room)) {
        roomToMessages.delete(room);
      }
    }
    console.log("アクティブなルーム(処理後)は" + roomToMessages.size);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

function getRoomToActiveNumber(io) {
  const arr = Array.from(io.sockets.adapter.rooms);
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  let roomToActiveNumber = new Map();
  for (const room of filtered) {
    roomToActiveNumber.set(room[0], room[1].size);
    // console.log("room[0]: "+room[0]+"room[1]: "+room[1].size);
  }
  // console.log(rooms);

  return roomToActiveNumber;
}
