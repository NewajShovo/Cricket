import React, { Component } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const createRoom = () => {
  console.log("Hello create room called");
  socket.emit("room:create", { type: "stranger" });
};

class Button extends Component {
  state = {
    loading: false,
  };

  handleClick = () => {
    this.setState({ loading: true });
    createRoom();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  render() {
    return (
      <>
        <button onClick={this.handleClick}>{this.props.label}</button>
        {this.state.loading && <div>Loading...</div>}
      </>
    );
  }
}
socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("room:created", (data) => {
  console.log("Room created!!!", data);
});

socket.on("room: Duplicacy", (data) => {
  console.log("Room Duplicacyyyyyy!!!", data);
});

socket.on("room:completed", (data) => {
  console.log("Room completed!!!", data);
});

export default Button;
