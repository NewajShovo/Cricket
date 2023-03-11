import React, { Component } from "react";
import { socket } from "./Socket.js";

const playerMove = (run, player, socket_id) => {
  console.log("Player move");
  let retrievPlayerInfo = player.split("-")[0];
  socket.emit("player:move", {
    score: run,
    type: retrievPlayerInfo,
    socketId: socket_id,
  });
};

class RunButton extends Component {
  handleClick = () => {
    console.log(`Button clicked: ${this.props.label}, id: ${this.props.id}`);
    playerMove(this.props.label, this.props.id, this.props.socketID);
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

export default RunButton;
