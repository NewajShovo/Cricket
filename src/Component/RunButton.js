import React, { Component } from "react";
class RunButton extends Component {
  handleClick = () => {
    console.log(`Button clicked: ${this.props.label}, id: ${this.props.id}`);
    // You can access the props here and use them as needed
  };
  render() {
    return (
      <>
        <button onClick={this.handleClick}>{this.props.label}</button>
      </>
    );
  }
}

export default RunButton;
