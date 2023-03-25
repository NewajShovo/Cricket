import io from "socket.io-client";
export const socket = io(process.env.REACT_APP_WEB_SERVICE, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("connect_error", (error) => {
  console.log(process.env.REACT_APP_WEB_SERVICE);
  console.error("Failed to connect to server:", error);
});

socket.on("disconnect", () => {
  console.warn("Disconnected from server.");
});
