import "../App.css";
import Button from '../Component/Button';
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

                        </div>
                    </div>

                </div>
                <div className="playground">
                    <div className="pitch">

                    </div>
                </div>
                <div className="player">
                    <div className="player-inside">

                        <div className="player-top">

                        </div>
                        <div className="player-score">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
  }

  export default Playground;