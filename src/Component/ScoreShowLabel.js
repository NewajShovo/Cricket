import React, { Component } from "react";
import { socket } from "./Socket.js";

class ScoreShowLabel extends Component {
  render() {
    return (
      <>
        <label>{this.props.label}</label>
      </>
    );
  }
}

socket.on("move:completed", (data) => {
  console.log("Move completed!!!", data);
});

socket.on("game:over", (data) => {
  console.log("game:over!!", data);
});

export default ScoreShowLabel;
