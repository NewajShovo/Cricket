import React, { Component } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:3000', { transports: ['websocket'] });


const createRoom = () => {
  console.log("Hello create room called");
  socket.emit("room:create", { type: "stranger" });
};

class Button extends Component {
  render() {
    return <button onClick={createRoom}>{this.props.label}</button>;
  }
}
socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on('room:created', () => {
  console.log("Room created!!!");
});

export default Button;
