import "../App.css";
import RunButton from "../Component/RunButton";
const Playground =() => {
    return (
        <div className="playground-page">
            <div className="top-div">
                <label id="player1Score" className="pg-label">Player1: 0/0 </label>
                <label id="player2Score" className="pg-label">Player2: 0/0 </label>
            </div>
            <div className="main-playground">
                <div className="player">
                    <div className="player-inside">
                        <div className="player-top">
                            <label className="player-label"> Player 1</label>
                        </div>
                        <div className="player-score">
                            <RunButton label = "1" id="player1-1" />
                            <RunButton label = "2" id="player1-2" />
                            <RunButton label = "3" id="player1-3" />
                            <RunButton label = "4" id="player1-4" />
                            <RunButton label = "5" id="player1-5" />
                            <RunButton label = "6" id="player1-6" />
                        </div>
                    </div>

                </div>
                <div className="playground">
                    <div className="above-pitch">

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
                            <RunButton label = "1" id="player2-1" />
                            <RunButton label = "2" id="player2-2" />
                            <RunButton label = "3" id="player2-3" />
                            <RunButton label = "4" id="player2-4" />
                            <RunButton label = "5" id="player2-5" />
                            <RunButton label = "6" id="player2-6" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
  }

  export default Playground;