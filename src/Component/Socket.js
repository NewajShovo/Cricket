import io from "socket.io-client";
export const socket = io("https://hand-crick.up.railway.app", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Socket connected");
});
