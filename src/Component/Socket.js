import io from "socket.io-client";
export const socket = io("https://cricketserver.onrender.com", {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("connect_error", (error) => {
  console.error("Failed to connect to server:", error);
});

socket.on("disconnect", () => {
  console.warn("Disconnected from server.");
});
