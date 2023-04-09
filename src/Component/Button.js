import React, { Component } from "react";
import { socket } from "./Socket.js";

var savedProp;

const createRoom = (data) => {
  console.log(data);

  if (typeof data.label === "string") {
    if (data.label === "Copy") {
      console.log("Copying...");
      savedProp.onClick(data);
    } else if (data.label === "Create link to play with friends") {
      console.log("Play with friends button");
      savedProp.onClick(data);
    } else {
      console.log("Hello create room called", socket.id);
      socket.emit("room:create", { type: "stranger" });
    }
  } else {
    console.log("I am dynamic....", data);
    const dynamicLabelValue = data.label.props.children;
    if (dynamicLabelValue === "Click here to join") {
      console.log("Click here to join.");
      savedProp.onClick(data);
    } else if (dynamicLabelValue === "Ready to join") {
      savedProp.onClick(data);
    }
  }
};

class Button extends Component {
  handleClick = () => {
    // console.log(this.props);
    savedProp = this.props;
    createRoom(this.props);
  };
  render() {
    return (
      <>
        <button
          className={this.props.className}
          onClick={this.handleClick}
          disabled={this.props.disabled}
        >
          {this.props.label}
        </button>
      </>
    );
  }
}

socket.on("room:created", (data) => {
  console.log("Room created!!!", data);
  data.label = "Room Created";
  savedProp.onClick(data);
});

socket.on("room: Duplicacy", (data) => {
  console.log("Room Duplicacyyyyyy!!!", data);
});

socket.on("room:completed", (data) => {
  console.log("Room completed!!!", data);
  data.label = "Room completed";
  savedProp.onClick(data);
});

export default Button;
