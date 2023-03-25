import io from "socket.io-client";
export const socket = io(process.env.WEB_SERVICE, {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("Socket connected");
});
