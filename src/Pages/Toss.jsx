import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socket } from "../Component/Socket";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Toss = () => {
  const [currentPlayer1, setcurrentPlayer1] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();
  const { state } = location;
  const currentPlayer = state.players[socket.id].identity;
  console.log("Herrrreee.........",currentPlayer);
  const [isLoading, setIsLoading] = useState(true);
  const makeToss =() => {
    const tossResult = Math.floor(Math.random() * 10) + 1;
    console.log(tossResult);
    if(tossResult%2===1) setcurrentPlayer1(true);
    else setcurrentPlayer1(false);
    console.log(currentPlayer1,currentPlayer);
  }

  const redirectToPlayground=()=>{
    const props = {
      players:  state.players,
      player1_1stInnings: currentPlayer1,
      current_Socket_ID: socket.id
    };

    navigate("./Playground", { state: props });
  }

  useEffect(() => {
    makeToss();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setTimeout(() => {
      redirectToPlayground();
    }, 6000);

  }, []);

  return (
    <div className="toss-page">
      <div className="toss-point">
        <div className="loading-animation">
          {isLoading ? (
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        ) : (

          <h1 className="word">
          { currentPlayer1
            ? currentPlayer === "player1" 
              ? "You will bat first as Player1"
              : "You will ball first as Player2"
            : 
              currentPlayer === "player1" 
              ? "You will ball first as Player1" 
              : "You will bat first as Player2"
          }
        </h1>
        )}
          </div>
      </div>
    </div>
  )
}

export default Toss
