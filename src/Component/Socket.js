import io from "socket.io-client";
export const socket = io("https://cricketserver.onrender.com", {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("Socket connected");
});
