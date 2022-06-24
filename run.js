const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const roomToMessages = new Map();
const userIdToRoomName = new Map();

io.on("connection", (socket) => {
  console.log("sever-socketID: " + socket.id);

  socket.on("join", (data) => {
    socket.join(data.roomName);
    userIdToRoomName.set(data.userId, data.roomName);

    if (!roomToMessages.has(data.roomName)) {
      roomToMessages.set(data.roomName, []);
      console.log("createRoom");
      io.emit("addRoom", {
        roomName: data.roomName,
        activeNumber: getRoomToActiveNumber(io).get(data.roomName),
      });
    } else {
      io.emit("updateRoom", {
        roomName: data.roomName,
        activeNumber: getRoomToActiveNumber(io).get(data.roomName),
      });
    }

    io.to(data.roomName).emit("addMember", {
      userId: data.userId,
      messages: roomToMessages.get(data.roomName),
      activeNumber: getRoomToActiveNumber(io).get(data.roomName),
    });
  });

  socket.on("chat message", (data) => {
    roomToMessages
      .get(data.roomName)
      .push({ userName: data.userName, message: data.message });
    io.to(data.roomName).emit("receive", {
      userId: data.userId,
      userName: data.userName,
      message: data.message,
    });
  });

  socket.on("rooms", () => {
    let rooms = [];
    for (let [roomName, activeNumber] of getRoomToActiveNumber(io)) {
      if (roomName) {
        rooms.push({ roomName: roomName, activeNumber: activeNumber });
      }
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

    console.log("disconnect" + socket.id);
    let roomName = userIdToRoomName.get(socket.id);
    userIdToRoomName.delete(socket.id);
    let activeNumber = getRoomToActiveNumber(io).get(roomName);

    if (getRoomToActiveNumber(io).get(roomName)) {
      console.log("activeNumber: " + activeNumber);
      io.to(roomName).emit("updateActiveNumber", {
        activeNumber: activeNumber,
      });

      io.emit("updateRoom", {
        roomName: roomName,
        activeNumber: getRoomToActiveNumber(io).get(roomName),
      });
    } else {
      console.log("deleteRoom");
      io.emit("deleteRoom", { roomName: roomName });
    }
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
  }

  return roomToActiveNumber;
}
