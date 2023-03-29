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
    var value = "hide";
    const currentSocketID = state.current_Socket_ID;
    const player1_First_Innings = state.player1_1stInnings;
    const currentPlayer = state.players[socket.id].identity;
    const [showGameOverDialog, setShowGameOverDialog] = useState(false);
    const [showPlayer1Move, setshowPlayer1Move] = useState("Your turn!!!");
    const [player1StoredValue, setplayer1StoredValue] = useState(0);
    const [player1Stopped, setplayer1Stopped] = useState(false);
    const [player2Stopped, setplayer2Stopped] = useState(false);
    const [showPlayer2Move, setshowPlayer2Move] = useState("Opponents turn!!!");
    const [showFinalScore, setshowFinalScore] = useState("Opponents turn!!!");
    const [player2StoredValue, setplayer2StoredValue] = useState(0);
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
  console.log("Toss Result: ", player1_First_Innings);

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

 const updateScore = (data) =>{
    console.log("Score Updatedfasdfas",data);
    var buttonId = data.scoreID;
    var runString = data.scoreLabel;
    buttonId = buttonId.replace(/btn[1-9]/, "move");
    console.log(buttonId);
    const moveDiv = document.querySelector("."+buttonId);
    moveDiv.style.animationPlayState = "paused";
    if(buttonId === "player1-move"){
        setshowPlayer1Move("Player 1 move completed!!");
        setplayer1Stopped(true);
        setplayer1StoredValue(runString);
        moveDiv.style.animationPlayState = "paused";
    }else{
        setshowPlayer2Move("Player 2 move completed!!");
        setplayer2StoredValue(runString);
        setplayer2Stopped(true);
        moveDiv.style.animationPlayState = "paused";
    }
  }
  
  useEffect(() => {
    console.log("HELLO BRO!!!", player1Stopped, player2Stopped);
    if(player1Stopped && player2Stopped){
        var currentDiv = document.querySelector(".player1-move");
        currentDiv.style.display = "none";

        var currentDiv = document.querySelector(".player2-move");
        currentDiv.style.display = "none";

        if(player1StoredValue===player2StoredValue){
            setshowFinalScore("Bowler gets a wicket!!!!");
        }else{
            setshowFinalScore(player1StoredValue);
        }
        currentDiv = document.querySelector(".player3-move");
        currentDiv.style.display = "flex"; // or any other visible display value

        setTimeout(() => {
            currentDiv.style.display = "none";
            currentDiv = document.querySelector(".player1-move");
            currentDiv.style.display = "flex";
            currentDiv.style.animationPlayState = "running";
            currentDiv = document.querySelector(".player2-move");
            currentDiv.style.display = "flex";
            currentDiv.style.animationPlayState = "running";
            setplayer1Stopped(false);
            setplayer2Stopped(false);
          }, 2000);


    }
  }, [player1Stopped, player2Stopped]);


    useEffect(() => {
        socket.on("try-again:completed", tryAgainCompleted);
        socket.on("home-page:completed", homePageCompleted);
        socket.on("move:completed", handleMoveCompleted);
        socket.on("game:over", handleGameOver);
        socket.on("score:updated", updateScore)
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
                <div className="playground">
                    <div className="above-pitch">
                        <ul>
                            <li>
                                {player1_First_Innings
                                    ? (currentPlayer === "player1"
                                         ? "You will bat first!"
                                         : "You will ball first!")
                                    : (currentPlayer === "player2"
                                        ? "You will bat first!"
                                        : "You will ball first!")
                                }

                            </li>
                        </ul>
                    </div>
                    <div className="pitch">
                        <div className="player1-move">
                            <label id="player1-label" className="pitch-text">{showPlayer1Move}</label>
                        </div>
                        <div className="player3-move">
                            <label id="player1-label" className="pitch-text">{showFinalScore}</label>
                        </div>
                        <div className="player2-move">
                            <label id="player2-label" className="pitch-text">{showPlayer2Move}</label>
                        </div>
                    </div>
                    <div className="below-pitch">
                    {currentPlayer === 'player2' ? null: 
                        <div className="player1-Score">
                            <div className="player1-Score-top-section">
                                <div className="player-timer">
                                    <div className="spinner"></div>
                                </div>
                                <div className="player-top">
                                    <label className="player-label"> Player 1</label>
                                </div>
                            </div>
                            <div className="player-score">
                                <RunButton label = "1" id="player1-btn1" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "2" id="player1-btn2" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "3" id="player1-btn3" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "4" id="player1-btn4" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "5" id="player1-btn5" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "6" id="player1-btn6" socketID = {currentSocketID} disabled= {false}/>
                            </div>
                        </div>  
                    }
                    {currentPlayer === "player1" ? null: 
                      <div className="player2-Score" >
                            <div className="player1-Score-top-section">
                                <div className="player-timer">
                                    <div className="spinner"></div>
                                </div>
                                <div className="player-top">
                                    <label className="player-label"> Player 2</label>
                                </div>
                            </div>
                            <div className="player-score">
                                <RunButton label = "1" id="player2-btn1" socketID = {currentSocketID} disabled= { false}/>
                                <RunButton label = "2" id="player2-btn2" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "3" id="player2-btn3" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "4" id="player2-btn4" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "5" id="player2-btn5" socketID = {currentSocketID} disabled= {false}/>
                                <RunButton label = "6" id="player2-btn6" socketID = {currentSocketID} disabled= {false}/>
                            </div>
                      </div>   
                    }
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default Playground;