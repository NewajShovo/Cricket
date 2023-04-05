import React, { Component } from "react";
import { socket } from "./Socket.js";
import "../App.css";

class ScoreShowLabel extends Component {
  render() {
    return (
      <>
        <label className="score-card">{this.props.label}</label>
      </>
    );
  }
}
export default ScoreShowLabel;
