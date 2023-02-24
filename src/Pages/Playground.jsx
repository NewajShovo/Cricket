import "../App.css";
import RunButton from "../Component/RunButton";
import ScoreShowLabel from "../Component/ScoreShowLabel";
import { useLocation } from 'react-router-dom';
import { socket } from "../Component/Socket";
const Playground =() => {
    const location = useLocation();
    const { state } = location;
    console.log("Transferred value: ", state);
    console.log("Current socket id: ", socket.id);
    const currentPlayer = state.players[socket.id].identity;
    console.log("Player: ", currentPlayer);
    return (
        <div className="playground-page">
            <div className="top-div">
                <div  className="pg-label">
                    <ScoreShowLabel label = "Player1: 0/0" id="player1Score" />
                </div>
                <div  className="pg-label">
                    <ScoreShowLabel label = "Player2: 0/0" id="player2Score" />
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