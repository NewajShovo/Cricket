import "../App.css";
import RunButton from "../Component/RunButton";
import ScoreShowLabel from "../Component/ScoreShowLabel";
import { useNavigate, useLocation } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { state } = location;
    console.log(state);
    //  state.players[socket.id].identity;
    console.log("HERE: ",state.players);
    console.log( state.players[socket.id].identity);

    const currentSocketID = state.current_Socket_ID;
    const player1_First_Innings = state.player1_1stInnings;
    const currentPlayer = state.players[socket.id].identity;
    const [showGameOverDialog, setShowGameOverDialog] = useState(false);
    const [player1Score, setPlayer1Score] = useState({ runs: 0, wickets: 0 });
    const [player2Score, setPlayer2Score] = useState({ runs: 0, wickets: 0 });

// Define functions to update the scores based on socket events
const handleMoveCompleted = (data) => {
  // Update the scores based on the game data
  console.log("COmpletedddddd!!!!!");
  console.log(data);
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

  if(player1_First_Innings){
    if(numberOfBall<=6){
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

  }else{

    if(numberOfBall<=6){
        console.log("First Half");
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
      }else{
        console.log("Second Half");
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
      }
  }
};

const handleGameOver = (data) => {
    console.log("Game Over");
    setShowGameOverDialog(true);
};


const handleButtonClick = (props) => {
    if(props==="try-again"){
        socket.emit("try-again:initiated", {
            socketId: socket.id,
        });
    }
    else{
        socket.emit("home-page:initiated", {
            socketId: socket.id,
        });
    }
};

const tryAgainCompleted = (data) =>{

    const resetScore = {
        runs: 0,
        wickets: 0
    };
    previousPlayer1Score.runs = 0;
    previousPlayer1Score.wickets = 0;
    previousPlayer2Score.runs = 0;
    previousPlayer2Score.wickets = 0;
    setPlayer1Score(resetScore);
    setPlayer2Score(resetScore);
    setShowGameOverDialog(false);
}
const homePageCompleted = (data) =>{
    navigate("/");
}


    useEffect(() => {
        socket.on("try-again:completed", tryAgainCompleted);
        socket.on("home-page:completed", homePageCompleted);
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
                            <GameOverDialog onButtonClicked={handleButtonClick}/>
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
                            <RunButton label = "1" id="player1-btn1" socketID = {currentSocketID} disabled= {currentPlayer === "player2" ? true : false}/>
                            <RunButton label = "2" id="player1-btn2" socketID = {currentSocketID} disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "3" id="player1-btn3" socketID = {currentSocketID} disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "4" id="player1-btn4" socketID = {currentSocketID} disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "5" id="player1-btn5" socketID = {currentSocketID} disabled= {currentPlayer === "player2" ? true : false} />
                            <RunButton label = "6" id="player1-btn6" socketID = {currentSocketID} disabled= {currentPlayer === "player2" ? true : false} />
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
                            <RunButton label = "1" id="player2-btn1" socketID = {currentSocketID} disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "2" id="player2-btn2" socketID = {currentSocketID} disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "3" id="player2-btn3" socketID = {currentSocketID} disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "4" id="player2-btn4" socketID = {currentSocketID} disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "5" id="player2-btn5" socketID = {currentSocketID} disabled= {currentPlayer === "player1" ? true : false} />
                            <RunButton label = "6" id="player2-btn6" socketID = {currentSocketID} disabled= {currentPlayer === "player1" ? true : false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default Playground;