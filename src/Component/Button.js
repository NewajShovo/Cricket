import React, { Component } from "react";
import io from "socket.io-client";
var savedProp;
var isAvailable = false;
const socket = io("http://localhost:3000", { transports: ["websocket"] });

const createRoom = () => {
  console.log("Hello create room called");
  socket.emit("room:create", { type: "stranger" });
};

class Button extends Component {
  handleClick = () => {
    createRoom();
    savedProp = this.props;
  };
  render() {
    return (
      <>
        <button onClick={this.handleClick}>{this.props.label}</button>
      </>
    );
  }
}
socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("room:created", (data) => {
  console.log("Room created!!!", data);
  savedProp.onClick(data);
});

socket.on("room: Duplicacy", (data) => {
  console.log("Room Duplicacyyyyyy!!!", data);
});

socket.on("room:completed", (data) => {
  console.log("Room completed!!!", data);
  savedProp.onClick(data);
});

export default Button;
