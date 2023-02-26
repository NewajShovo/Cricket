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
export default ScoreShowLabel;
