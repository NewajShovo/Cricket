import React, { Component } from "react";
import { socket } from "./Socket.js";

var savedProp;

const createRoom = () => {
  console.log("Hello create room called", socket.id);
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
        <button onClick={this.handleClick} disabled={this.props.disabled}>
          {this.props.label}
        </button>
      </>
    );
  }
}

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
