const shortID = require("shortid");
const express = require("express");
const { count } = require("console");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static("public"));
let rooms = [];
let uniquePlayer = [];
let player_socketMap = {};
let players_score = {};
const numberOfOvers = 1;

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
      const index = rooms.findIndex((room) => room.vacant == true);
      if (index >= 0) {
        console.log("Found some free room");
        const room = rooms[index];
        room.players[socket.id] = {
          identity: "player2",
          option: null,
          optionLock: false,
          score: 0,
        };
        room.vacant = false;
        room.roomFree = false;
        console.log(room);
        player_socketMap[socket.id] = room.roomId;
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
        player_socketMap[socket.id] = room.roomId;
        console.log(room);
        rooms.push(room);
        socket.join(room.roomId);
        uniquePlayer.push(socket.id);
        io.to(room.roomId).emit("room:created", room);
      }
    }
  });

  socket.on("try-again:initiated", (data) => {
    const roomIdForPlayers = player_socketMap[data.socketId];
    players_score[roomIdForPlayers].count = 0;
    io.to(roomIdForPlayers).emit(
      "try-again:completed",
      players_score[roomIdForPlayers]
    );
  });

  socket.on("home-page:initiated", (data) => {
    var roomIdForPlayers;
    if (player_socketMap[data.socketId]) {
      roomIdForPlayers = player_socketMap[data.socketId];
      delete player_socketMap[data.socketId];
    }
    io.to(roomIdForPlayers).emit(
      "home-page:completed",
      players_score[roomIdForPlayers]
    );
  });

  socket.on("player:move", (data) => {
    console.log("Player:move ", data);
    console.log(player_socketMap[data.socketId]);
    const roomIdForPlayers = player_socketMap[data.socketId];
    if (
      !players_score[roomIdForPlayers] ||
      !players_score[roomIdForPlayers]["info"]
    ) {
      console.log("If case");
      if (!players_score[roomIdForPlayers]) {
        players_score[roomIdForPlayers] = {
          count: 0,
          info: {
            [data.socketId]: {
              playerType: data.type,
              playerRun: data.score,
            },
          },
        };
      } else {
        players_score[roomIdForPlayers]["info"] = {
          [data.socketId]: {
            playerType: data.type,
            playerRun: data.score,
          },
        };
      }
    } else {
      if (players_score[roomIdForPlayers]["info"][data.socketId]) {
        console.log("if inside else");
        players_score[roomIdForPlayers]["info"] = {
          [data.socketId]: {
            playerType: data.type,
            playerRun: data.score,
          },
        };
        console.log(players_score[roomIdForPlayers]);
      } else {
        console.log("else inside else");
        console.log(players_score[roomIdForPlayers]);
        players_score[roomIdForPlayers]["info"][data.socketId] = {
          playerType: data.type,
          playerRun: data.score,
        };
        players_score[roomIdForPlayers].count++;
        console.log(players_score[roomIdForPlayers]);
        console.log("Move Completed!!!!");
        io.to(roomIdForPlayers).emit(
          "move:completed",
          players_score[roomIdForPlayers]
        );
        delete players_score[roomIdForPlayers].info;
        if (players_score[roomIdForPlayers].count == 12) {
          setTimeout(function () {
            console.log("Game over");
            io.to(roomIdForPlayers).emit(
              "game:over",
              players_score[roomIdForPlayers]
            );
          }, 1.5);
        }
      }
    }
  });
});

http.listen(3000, () => {
  console.log("Your server is running succefully!!!!");
});
