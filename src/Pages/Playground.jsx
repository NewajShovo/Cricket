import "../App.css";
import RunButton from "../Component/RunButton";
import ScoreShowLabel from "../Component/ScoreShowLabel";
import { useNavigate, useLocation} from 'react-router-dom';
import { socket } from "../Component/Socket";
import React, { useState, useEffect } from 'react';
import GameOverDialog from "../Component/GameOver"
import InningsBreakDialog from "../Component/InningsBreak"
var previousPlayer1Score = {
    runs: 0, 
    wickets: 0
};
var previousPlayer2Score = {
    runs: 0,
    wickets: 0
};
var numberOfBall;

const Playground =() => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    console.log("State", state);
    const currentSocketID = state.current_Socket_ID;
    const player1_First_Innings = state.player1_1stInnings;
    const currentPlayer = state.players[socket.id].identity;
    const [showGameOverDialog, setShowGameOverDialog] = useState(false);
    const [showInningsBreak, setshowInningsBreak] = useState(false);
    const [showPlayer1Move, setshowPlayer1Move] = useState("Player1 move pending!!!");
    const [player1StoredValue, setplayer1StoredValue] = useState(0);
    const [player1Stopped, setplayer1Stopped] = useState(false);
    const [player2Stopped, setplayer2Stopped] = useState(false);
    const [showPlayer2Move, setshowPlayer2Move] = useState("Player2 move pending!!!");
    const [showFinalScore, setshowFinalScore] = useState("Opponents turn!!!");
    const [player2StoredValue, setplayer2StoredValue] = useState(0);
    const [gameOverText, setgameOverText] = useState("");
    const [player1RunButtonDisable, setplayer1RunButtonDisable] = useState(false);
    const [player2RunButtonDisable, setplayer2RunButtonDisable] = useState(false);
    const [player1Score, setPlayer1Score] = useState({ runs: 0, wickets: 0 });
    const [player2Score, setPlayer2Score] = useState({ runs: 0, wickets: 0 });
    const [current_info, setcurrent_info] = useState("");




// Define functions to update the scores based on socket events
const handleMoveCompleted = (data) => {
  // Update the scores based on the game data
  console.log("COmpletedddddd!!!!!");
  console.log(data);
  numberOfBall = data.count;
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
        const scoreId = `1-${numberOfBall}`;
        console.log("Scored Id: ", scoreId);
        var calculateRuns = 0, calculateWkts = 0;
        if(parseInt(data['info'][player1_ID].playerRun) === parseInt(data['info'][player2_ID].playerRun)){
            calculateRuns = previousPlayer1Score.runs;
            calculateWkts = previousPlayer1Score.wickets + 1;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = 'W';
            }
        }
        else{
            calculateRuns = previousPlayer1Score.runs + parseInt(data['info'][player1_ID].playerRun);
            calculateWkts = previousPlayer1Score.wickets;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = data['info'][player1_ID].playerRun;
            }
        }
        const newScore = {
            runs: calculateRuns,
            wickets: calculateWkts
          };
          previousPlayer1Score = newScore;
        //   console.log(previousPlayer1Score);
          setPlayer1Score(newScore);
      }else{
        console.log(previousPlayer1Score);
        const scoreId = `2-${numberOfBall-6}`;
        console.log("Second Half");
        var calculateRuns = 0, calculateWkts = 0;
        console.log("Previous: ", player2Score.runs, player2Score.wickets);
        if(parseInt(data['info'][player1_ID].playerRun) === parseInt(data['info'][player2_ID].playerRun)){
            calculateRuns = previousPlayer2Score.runs;
            calculateWkts = previousPlayer2Score.wickets + 1;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = 'W';
            }
        }
        else{
            calculateRuns = previousPlayer2Score.runs + parseInt(data['info'][player2_ID].playerRun);
            calculateWkts = previousPlayer2Score.wickets;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = data['info'][player2_ID].playerRun;
            }
        }
        const newScore = {
            runs: calculateRuns,
            wickets: calculateWkts
        };
        previousPlayer2Score = newScore;
        setPlayer2Score(newScore);
        console.log("Last Ball Run: ", calculateRuns, previousPlayer1Score.runs);
        if(numberOfBall===12||calculateRuns>previousPlayer1Score.runs){
            if(calculateRuns==previousPlayer1Score.runs){
                setgameOverText("Game over. You lose.");
            }else if(calculateRuns>previousPlayer1Score.runs){
                setgameOverText("Game over. Player2 Wins the game");
            }else{
                setgameOverText("Game over. Player2 lost the game");
            }
            socket.emit("game-over:initiated", {
                socketId: socket.id,
            });
        }
      }

  }else{

    if(numberOfBall<=6){
        const scoreId = `1-${numberOfBall}`;
        console.log("First Half");
        var calculateRuns = 0, calculateWkts = 0;
        console.log("Previous: ", player2Score.runs, player2Score.wickets);
        if(parseInt(data['info'][player1_ID].playerRun) === parseInt(data['info'][player2_ID].playerRun)){
            calculateRuns = previousPlayer2Score.runs;
            calculateWkts = previousPlayer2Score.wickets + 1;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = 'W';
            }
        }
        else{
            calculateRuns = previousPlayer2Score.runs + parseInt(data['info'][player2_ID].playerRun);
            calculateWkts = previousPlayer2Score.wickets;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = data['info'][player2_ID].playerRun;
            }
        }
        const newScore = {
            runs: calculateRuns,
            wickets: calculateWkts
        };
        previousPlayer2Score = newScore;
        setPlayer2Score(newScore);    
      }else{
        console.log("Second Half");
        const scoreId = `2-${numberOfBall-6}`;
        var calculateRuns = 0, calculateWkts = 0;
        if(parseInt(data['info'][player1_ID].playerRun) === parseInt(data['info'][player2_ID].playerRun)){
            calculateRuns = previousPlayer1Score.runs;
            calculateWkts = previousPlayer1Score.wickets + 1;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = 'W';
            }
        }
        else{
            calculateRuns = previousPlayer1Score.runs + parseInt(data['info'][player1_ID].playerRun);
            calculateWkts = previousPlayer1Score.wickets;
            const label = document.getElementById(scoreId);
            if (label) {
              label.textContent = data['info'][player1_ID].playerRun;
            }
        }
        const newScore = {
            runs: calculateRuns,
            wickets: calculateWkts
          };
          previousPlayer1Score = newScore;
          setPlayer1Score(newScore);
          console.log(calculateRuns)
          console.log("Last Ball Run: ", calculateRuns, previousPlayer2Score.runs);
          if(numberOfBall===12||calculateRuns>previousPlayer2Score.runs){
            if(calculateRuns==previousPlayer2Score.runs){
                setgameOverText("Game over. You lose.");
            }else if(calculateRuns>previousPlayer2Score.runs){
                setgameOverText("Game over. Player1 Wins the game");
            }else{
                setgameOverText("Game over. Player1 lost the game");
            }
            socket.emit("game-over:initiated", {
                socketId: socket.id,
            });
        }
      }
  }
};

const handleRunClick = (data) => {
    const btnId = data.id;
    const player = btnId.split("-")[0]; // extracts "player1"
    if(player==="player1"){
        setplayer1RunButtonDisable(true);
    }else{
        setplayer2RunButtonDisable(true);
    }
  };

const handleGameOver = (data) => {
    console.log("Game Over");
    setTimeout(() => {
        setShowGameOverDialog(true);
      }, 1000);
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
    for (let i = 1; i <= 6; i++) {
        let scoreId = `1-${i}`;
        let label = document.getElementById(scoreId);
        if (label) {
            label.textContent = '?';
        }
        scoreId = `2-${i}`;
        label = document.getElementById(scoreId);
        if (label) {
            label.textContent = '?';
        }
    }

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
    if(player1_First_Innings){
        if(currentPlayer === "player1"){
            setcurrent_info("Now you are batting")
        }else{
            setcurrent_info("Now you are bowling.")
        }
    }
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
        console.log("Number of ball: ",numberOfBall);
        if(player1StoredValue===player2StoredValue){
            setshowFinalScore("Bowler gets a wicket!!!!");
        }else{
            if(player1_First_Innings){
                if(numberOfBall<=6){
                    setshowFinalScore(player1StoredValue);
                }else{
                    setshowFinalScore(player2StoredValue);
                }
            }else{
                if(numberOfBall<=6){
                    setshowFinalScore(player2StoredValue);
                }else{
                    setshowFinalScore(player1StoredValue);
                }
            }
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
            setshowPlayer1Move("Player1 move pending!!!");
            setshowPlayer2Move("Player2 move pending!!!");
            setplayer1RunButtonDisable(false);
            setplayer2RunButtonDisable(false);
            if(numberOfBall == 6) {
                setshowInningsBreak(true);
                if(player1_First_Innings) {
                  if(currentPlayer === "player1") {
                    setcurrent_info("Now you are bowling.")
                  } else {
                    setcurrent_info("Now you are batting.")
                  }
                } else {
                  if(currentPlayer === "player2") {
                    setcurrent_info("Now you are bowling.")
                  } else {
                    setcurrent_info("Now you are batting.")
                  }
                }
                // Set showInningsBreak to false after 1.5 seconds
                setTimeout(() => {
                  setshowInningsBreak(false);
                }, 2500);
              }
          }, 2100);
    }
  }, [player1Stopped, player2Stopped]);


    useEffect(() => {
        if(player1_First_Innings){
            if(currentPlayer === "player1"){
                setcurrent_info("Now you are batting.")
            }else{
                setcurrent_info("Now you are bowling.")
            }
        }else{
            if(currentPlayer === "player2"){
                setcurrent_info("Now you are batting.")
            }else{
                setcurrent_info("Now you are bowling.")
            }
        }

        socket.on("try-again:completed", tryAgainCompleted);
        socket.on("home-page:completed", homePageCompleted);
        socket.on("move:completed", handleMoveCompleted);
        socket.on("game-over:completed", handleGameOver);
        socket.on("score:updated", updateScore)
        return () => {
          socket.off("move:completed", handleMoveCompleted);
          socket.off("game-over:completed", handleGameOver);
        };
      }, []);

    return (

        <div className="playground-page">

            {showGameOverDialog && <div className="game-over-dialog-container">
                            <div className="game-over-dialog-overlay">
                                <GameOverDialog text="Game over. You lose." onButtonClicked={handleButtonClick} />
                            </div>
            </div>
            }

            {showInningsBreak && <div className="innings-break-container">
                            <div className="innings-break-overlay">
                                <InningsBreakDialog text="Second innings will start now" />
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
                        <div className="first_innings_title">
                            <ul>
                                <li>
                                    <h2>{current_info}</h2>
                                </li>
                            </ul>
                        </div>
                        <div className="first_innings">
                            <label style={{ color: 'white' }}>First Innings:</label>
                            <label style={{ backgroundColor: 'white' }} id="1-1" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="1-2" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="1-3" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="1-4" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="1-5" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="1-6" className="score_label">?</label>
                        </div>

                        <div className="second_innings">
                            <label style={{ color: 'white' }}>Second Innings:</label>
                            <label style={{ backgroundColor: 'white' }} id="2-1" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="2-2" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="2-3" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="2-4" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="2-5" className="score_label">?</label>
                            <label style={{ backgroundColor: 'white' }} id="2-6" className="score_label">?</label>
                        </div>
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
                                <div className="player-top">
                                    <label className="player-label"> Player 1</label>
                                </div>
                            </div>
                            <div className="player-score">
                                <RunButton label = "1" id="player1-btn1" socketID = {currentSocketID} disabled= {player1RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "2" id="player1-btn2" socketID = {currentSocketID} disabled= {player1RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "3" id="player1-btn3" socketID = {currentSocketID} disabled= {player1RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "4" id="player1-btn4" socketID = {currentSocketID} disabled= {player1RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "5" id="player1-btn5" socketID = {currentSocketID} disabled= {player1RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "6" id="player1-btn6" socketID = {currentSocketID} disabled= {player1RunButtonDisable} onClick={handleRunClick}/>
                            </div>
                        </div>  
                    }
                    {currentPlayer === "player1" ? null: 
                      <div className="player2-Score" >
                            <div className="player1-Score-top-section">
                                <div className="player-top">
                                    <label className="player-label"> Player 2</label>
                                </div>
                            </div>
                            <div className="player-score">
                                <RunButton label = "1" id="player2-btn1" socketID = {currentSocketID} disabled= { player2RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "2" id="player2-btn2" socketID = {currentSocketID} disabled= {player2RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "3" id="player2-btn3" socketID = {currentSocketID} disabled= {player2RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "4" id="player2-btn4" socketID = {currentSocketID} disabled= {player2RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "5" id="player2-btn5" socketID = {currentSocketID} disabled= {player2RunButtonDisable} onClick={handleRunClick}/>
                                <RunButton label = "6" id="player2-btn6" socketID = {currentSocketID} disabled= {player2RunButtonDisable} onClick={handleRunClick}/>
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