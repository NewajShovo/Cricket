import React from 'react';
import "../Toss.css";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socket } from "../Component/Socket";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Toss = () => {
  const [player1Status, setplayer1Status] = useState(true);
  const location = useLocation();
  const navigate= useNavigate();
  const { state } = location;
  const currentPlayer = state.players[socket.id].identity;
  console.log("Herrrreee.........",currentPlayer);
  const [isLoading, setIsLoading] = useState(true);
  const makeToss =() => {
    console.log("One Tosss");
    const tossResult = Math.floor(Math.random() * 10) + 1;
    console.log(tossResult);
    if(tossResult%2===1)  setplayer1Status(true);
    else setplayer1Status(false);
    console.log(player1Status,currentPlayer);
  }



  const redirectToPlayground=()=>{
    console.log("HERE", player1Status);
    const props = {
      players:  state.players,
      player1_1stInnings: player1Status,
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
          { player1Status
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
