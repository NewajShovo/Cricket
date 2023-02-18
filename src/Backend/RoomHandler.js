const shortID = require("shortid");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static("public"));

let roomFree = true;
let rooms = [];
let uniquePlayer = [];

function checkProbableDuplicacy(socket) {
  return uniquePlayer.includes(socket.id);
}

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("room:create", (data) => {
    console.log("Received 'room:create' message with data:", data);
    if (checkProbableDuplicacy(socket)) {
      io.emit("room: Duplicacy");
      return;
    } else if (data.type == "stranger") {
      console.log(socket.id);
      const index = rooms.findIndex((room) => room.vacant == true);
      if (index >= 0) {
        console.log("Found some free room");
        const room = rooms[index];
        console.log(room);
        room.players[socket.id] = {
          identity: "player2",
          option: null,
          optionLock: false,
          score: 0,
        };
        room.vacant = false;
        room.roomFree = false;
        uniquePlayer.push(socket.id);
        socket.join(room.roomId);
        io.to(room.roomId).emit("room:completed", room);
      } else {
        console.log("Creating new room");
        roomFree = false;
        const room = {
          roomId: shortID.generate(),
          players: {
            [socket.id]: {
              identity: "player1",
              option: null,
              optionLock: false,
              score: 0,
            },
          },
          vacant: true,
          roomFree: true,
        };
        console.log(room);
        rooms.push(room);
        socket.join(room.roomId);
        uniquePlayer.push(socket.id);
        io.to(room.roomId).emit("room:created", room);
      }
    }
  });

  socket.on("player:move", (data) => {
    console.log("Player:move ", data);
  });
});

http.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
