import React, { Component } from "react";
import { socket } from "./Socket.js";
var savedProp;
const playerMove = (run, player, socket_id) => {
  console.log("Player moveeeeeeeeee");
  let retrievPlayerInfo = player.split("-")[0];
  socket.emit("player:move", {
    score: run,
    type: retrievPlayerInfo,
    socketId: socket_id,
  });
  socket.emit("score:update", {
    socketId: socket_id,
    scoreLabel: savedProp.label,
    scoreID: savedProp.id,
  });
};

class RunButton extends Component {
  handleClick = () => {
    console.log(`Button clicked: ${this.props.label}, id: ${this.props.id}`);
    savedProp = this.props;
    savedProp.onClick(this.props);
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
