import "../Home.css";
import Button from '../Component/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from "../Component/Socket";


const Home =() => {
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const navigate= useNavigate();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected");
            alert("Socket connected");
            setSocketConnected(true);
        });
    }, [socketConnected]);
    const handleButtonClick = (props) => {
        if(props.roomFree){
            setLoading(true);
        }
        else{
            setLoading(false);
            console.log("Navigate: ", props);
            navigate("./Toss", { state: props });
        }
        console.log(`Button was ${props} clicked in App.js`);
    };

    return (
        <div className="homePage">
            {socketConnected ? (
                <div className="button-container">
                    {loading && <div className="loader"></div>}
                    <Button label="Play with Computer" onClick={handleButtonClick} disabled={true}/>
                    <Button label="Play with Friends" onClick={handleButtonClick} />
                    <Button label="Play with Stranger" onClick={handleButtonClick} disabled={true}/>
                </div>
            ) : (
                <div className="button-container" style={{ color: 'red' }}>Connecting to server...</div>
            )}
        </div>

    );
  }

  export default Home;