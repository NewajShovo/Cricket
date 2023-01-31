// const shortID = require("shortid");

// const roomHandler = (io, socket, rooms) => {
//   const create = (payload, callback) => {
//     console.log(payload);
//     if (payload.type == "stranger") {
//       const index = rooms.findIndex((room) => room.vacant == true);
//       if (index >= 0) {
//         const room = rooms[index];
//         rooms.players[socket.id] = {
//           option: null,
//           optionLock: false,
//           score: 0,
//         };
//         room.vacant = false;
//         socket.join(room.roomId);
//         io.to(room.roomId).emit("room:get", room);
//         callback(null, room.roomId);
//       } else {
//         const room = {
//           roomId: shortID.generate(),
//           players: {
//             [socket.id]: {
//               option: null,
//               optionLock: false,
//               score: 0,
//             },
//           },
//           vacant: true,
//         };
//         rooms.push(room);
//         socket.join(room.roomId);
//         io.to(room.roomId).emit("room:get", room);
//         callback(null, room.roomId);
//       }
//     }
//   };
//   socket.on("room:create", create);
// };
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("room:create", (data) => {
    console.log("Received 'room:create' message with data:", data);
    // Your code to create a room and send a response to the client
    const roomId = "123456";
    console.log("Emitting data to client");
    socket.emit("room:created", { roomId });
  });
});

http.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
