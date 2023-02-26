import React from "react";
import { useNavigate } from "react-router-dom";
const GameOver = () => {
  const navigate = useNavigate();
  const handleClick = (buttonID) => {
    console.log(buttonID);
    navigate("/");
  };
  return (
    <div className="game-over-dialog">
      <div>
        <h2>Game Over</h2>
        <p>Sorry, you lost the game. Better luck next time!</p>
        <button onClick={() => handleClick("home")}>Move to Home Page</button>
        <button onClick={() => handleClick("try-again")}>Try Again</button>
      </div>
    </div>
  );
};

export default GameOver;
