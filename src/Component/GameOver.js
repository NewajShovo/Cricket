import React from "react";
const GameOver = (props) => {
  const handleClick = (buttonID) => {
    console.log(buttonID);
    if (buttonID === "home") {
      props.onButtonClicked(buttonID);
    } else {
      props.onButtonClicked(buttonID);
    }
  };
  return (
    <div className="game-over-dialog">
      <div>
        <h2>Game Over</h2>
        {/* <p>{props.text}</p>
        <p>Sorry, you lost the game. Better luck next time!</p> */}
        <button onClick={() => handleClick("home")}>Move to Home Page</button>
        <button onClick={() => handleClick("try-again")}>Try Again</button>
      </div>
    </div>
  );
};

export default GameOver;
