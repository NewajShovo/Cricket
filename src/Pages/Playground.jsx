import "../App.css";
import RunButton from "../Component/RunButton";
import ScoreShowLabel from "../Component/ScoreShowLabel";
import { useLocation } from 'react-router-dom';
import { socket } from "../Component/Socket";
import React, { useState, useEffect } from 'react';
import GameOverDialog from "../Component/GameOver"
var previousPlayer1Score = {
    runs: 0, 
    wickets: 0
};
var previousPlayer2Score = {
    runs: 0,
    wickets: 0
};


const Playground =() => {
    const location = useLocation();
    const { state } = location;
    const currentPlayer = state.players[socket.id].identity;

// Define state variables to hold the current scores
const [showGameOverDialog, setShowGameOverDialog] = useState(false);
const [player1Score, setPlayer1Score] = useState({ runs: 0, wickets: 0 });
const [player2Score, setPlayer2Score] = useState({ runs: 0, wickets: 0 });

// Define functions to update the scores based on socket events
const handleMoveCompleted = (data) => {
  // Update the scores based on the game data
  const numberOfBall = data.count;
  console.log(numberOfBall);
  var keyValues = Object.keys(data.info);
  var player1_ID, player2_ID;
  if(data.info[keyValues[0]].playerType == "player1"){
    player1_ID = keyValues[0];
    player2_ID = keyValues[1];
  }else{
    player2_ID = keyValues[0];
    player1_ID = keyValues[1];
  }
  console.log("Player 1: ", player1_ID);

  console.log("Player 2: ", player2_ID);
  if(numberOfBall<=3){
    console.log("First Half");
    var calculateRuns = 0, calculateWkts = 0;
    if(parseInt(data['info'][player1_ID].playerRun) === parseInt(data['info'][player2_ID].playerRun)){
        calculateRuns = previousPlayer1Score.runs;
        calculateWkts = previousPlayer1Score.wickets + 1;
    }
    else{
        calculateRuns = previousPlayer1Score.runs + parseInt(data['info'][player1_ID].playerRun);
        calculateWkts = previousPlayer1Score.wickets;
    }
    const newScore = {
        runs: calculateRuns,
        wickets: calculateWkts
      };
      previousPlayer1Score = newScore;
      setPlayer1Score(newScore);

  }else{
    console.log("Second Half");
    var calculateRuns = 0, calculateWkts = 0;
    console.log("Previous: ", player2Score.runs, player2Score.wickets);
    if(parseInt(data['info'][player1_ID].playerRun) === parseInt(data['info'][player2_ID].playerRun)){
        calculateRuns = previousPlayer2Score.runs;
        calculateWkts = previousPlayer2Score.wickets + 1;
    }
    else{
        calculateRuns = previousPlayer2Score.runs + parseInt(data['info'][player2_ID].playerRun);
        calculateWkts = previousPlayer2Score.wickets;
    }
    const newScore = {
        runs: calculateRuns,
        wickets: calculateWkts
    };
    previousPlayer2Score = newScore;
    setPlayer2Score(newScore);
  }
};

const handleGameOver = (data) => {
    console.log("Game Over");
    setShowGameOverDialog(true);
};


const handleButtonClick = (props) => {
    // if(props.roomFree){
    //     setLoading(true);
    // }
    // else{
    //     setLoading(false);
    //     console.log("Navigate: ", props);
    //     navigate("./Playground", { state: props });
    // }
    console.log(props);
};


    useEffect(() => {
        socket.on("move:completed", handleMoveCompleted);
        socket.on("game:over", handleGameOver);
        return () => {
          socket.off("move:completed", handleMoveCompleted);
          socket.off("game:over", handleGameOver);
        };
      }, []);

    return (

        <div className="playground-page">

            {showGameOverDialog && <div className="game-over-dialog-container">
                            <div className="game-over-dialog-overlay">
                            <GameOverDialog onClick={handleButtonClick}/>
                            </div>
            </div>
            }
                <div className="top-div">
                <div  className="pg-label">
                    <ScoreShowLabel label={`Player1: ${player1Score.runs}/${player1Score.wickets}`}/>
                </div>
                <div  className="pg-label">
                    <ScoreShowLabel label={`Player2: ${player2Score.runs}/${player2Score.wickets}`}/>
                </div>
            </div>
            <div className="main-playground">
                <div className="player">
                    <div className="player-inside">
                        <div className="player-top">
                            <label className="player-label"> Player 1</label>
                        </div>
                        <div className="player-score">
                            <RunButton label = "1" id="player1-btn1" disabled= {currentPlayer === "player2" ? true : false}/>
                            <RunButton label = "2" id="player1-btn2" disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "3" id="player1-btn3" disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "4" id="player1-btn4" disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "5" id="player1-btn5" disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "6" id="player1-btn6" disabled= {currentPlayer === "player2" ? true : false} />
                        </div>
                    </div>

                </div>
                <div className="playground">
                    <div className="above-pitch">
                        <h1 id="announcement"></h1>
                    </div>
                    <div className="pitch">

                    </div>
                    <div className="below-pitch">

                    </div>
                </div>
                <div className="player">
                    <div className="player-inside">

                        <div className="player-top">
                            <label className="player-label"> Player 2</label>
                        </div>
                        <div className="player-score">
                            <RunButton label = "1" id="player2-btn1" disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "2" id="player2-btn2" disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "3" id="player2-btn3" disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "4" id="player2-btn4" disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "5" id="player2-btn5" disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "6" id="player2-btn6" disabled= {currentPlayer === "player1" ? true : false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default Playground;