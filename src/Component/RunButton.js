import React, { Component } from "react";
class RunButton extends Component {
  render() {
    return (
      <>
        <button>{this.props.label}</button>
      </>
    );
  }
}

export default RunButton;
