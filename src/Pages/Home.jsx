import "../Home.css";
import Button from '../Component/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from "../Component/Socket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

const shortID = require("shortid");

const Home =() => {
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [playWithFriends, setplayWithFriends] = useState(false);
    const [linkToPlay, setlinkToPlay] = useState('');
    const [roomJoinStatus, setroomJoinStatus] = useState("Click here to join");
    const [storedRoomID, setstoredRoomID] = useState('hello');
    const [joinedViaLink, setjoinedViaLink] = useState(false);
    const inputRef = useRef(null);
    const navigate= useNavigate();
    var { roomIDParam } = useParams();
    console.log("Parameter,",roomIDParam);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected");
            alert("Socket connected");
            setSocketConnected(true);
            if(roomIDParam){
                setjoinedViaLink(true);
                setplayWithFriends(true);
            }
        });
    }, [socketConnected]);

    const generateRoomId = () => {
        const storedRoomID = localStorage.getItem("storedRoomID");
        if (storedRoomID && roomIDParam) {
            setstoredRoomID(storedRoomID);
            setjoinedViaLink(true);
            setplayWithFriends(true);
            console.log("Got value: ", roomId, storedRoomID);
        } else {
            var roomId = shortID.generate();
            setstoredRoomID(roomId);
            console.log("Generate: ", roomId);
            localStorage.setItem("storedRoomID", roomId);
        }
    }

    const handleButtonClick = (data) => {
        var currentLabel;
        
        if (typeof data.label === "string") {
            currentLabel = data.label;
        } else {
            currentLabel = data.label.props.children;
        }
        console.log(currentLabel);
        
        if(currentLabel==="Create link to play with friends"){
            console.log("I am here");
            setplayWithFriends(true);
            generateRoomId();
            const storedRoomID = localStorage.getItem("storedRoomID");
            setlinkToPlay(process.env.REACT_APP_CLIENT_SERVICE + "/" + storedRoomID);
        }else if(currentLabel === "Copy"){
            handleCopyClick();
        }else if(currentLabel === "Click here to join"){
            handleJoinningRoomNormally();
        } else if(currentLabel === "Ready to join"){
            handleJoinningFromLink(roomIDParam);
        }
        else{
            if(data.roomFree){
                setLoading(true);
            }
            else{
                setLoading(false);
                console.log("Navigate: ", data);
                navigate("./Toss", { state: data });
            }
        }
        console.log(`Button was ${data} clicked in App.js`);
    };

    const handleCopyClick = () => {    
        try {
            inputRef.current.select();
            console.log(inputRef.current.value);
            navigator.clipboard.writeText(inputRef.current.value)
              .then(() => {
                console.log('Text copied to clipboard');
                const message = `Link copied!\nShare it with your friends to join the room.`;
                alert(message, "background-color: #f8d7da; color: #721c24; border-color: #f5c6cb; padding: 10px;");
              })
              .catch(() => {
                alert('Could not copy text to clipboard. Please manually copy the text by selecting it and pressing Ctrl+C or Command+C.');
              });
          } catch (error) {
            console.error(error);
          }
        var joinRoomDiv = document.querySelector(".join-button");
        joinRoomDiv.style.display = "flex";
      };

      const handleJoinningRoomNormally = () => {
        console.log("Bro I am here!!!")
        console.log(storedRoomID);
        var copyDiv = document.querySelector(".copy-button");
        copyDiv.style.display = "none";
        setLoading(true);
        setroomJoinStatus("Waiting for friend...");
        socket.emit("join:room", {
            identity: "player1",
            socketId: socket.id,
            roomIdentity: storedRoomID,
          });
      };

      const handleJoinningFromLink = (roomId) => {
        console.log("Againnn I am here!!!")
        setLoading(true);
        socket.emit("join:room", {
            identity: "player2",
            socketId: socket.id,
            roomIdentity: roomId,
          });
      };

    const handleBackButton = () =>{
        setLoading(false);
        setplayWithFriends(false);
        setstoredRoomID('');
        setroomJoinStatus("Click here to join");
    }

    return (
        <div className="homePage">
            {socketConnected ? (
                playWithFriends ? (
                    joinedViaLink?(
                        <div className="linkCreation-container">
                            {loading && <div className="loader"></div>}
                            <Button className="join-button-link" label = <b>Ready to join</b>  onClick={handleButtonClick}/>
                        </div>

                    ) :
                    (
                    <div className="linkCreation-container">
                        {loading && <div className="loader"></div>}
                        <div className="copy-link-container">
                            <input className="input-text" ref={inputRef} type="text" value={linkToPlay} readOnly/>
                            <Button className="copy-button" label = "Copy"  onClick={handleButtonClick}/>
                        </div>
                        <div className="join-Room-Container">
                            <button className="back-button" onClick={handleBackButton}>
                                 <div className="back-button-content">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                     <span>Back</span>
                                 </div>
                            </button>
                            <Button className="join-button" label = <b>{roomJoinStatus}</b>  onClick={handleButtonClick}/>
                        </div>
                    </div>
                    )         

                ) : (
                    <div className="button-container">
                    {loading && <div className="loader"></div>}
                    <Button label="Play with Computer" onClick={handleButtonClick} disabled={false}/>
                    <Button label="Create link to play with friends" onClick={handleButtonClick} disabled={false}/>
                    <Button label="Play with Stranger" onClick={handleButtonClick} disabled={false}/>
                    </div>
                    )
                ) : 
            (
                <div className="button-container" style={{ color: 'red' }}><b>Connecting to server...</b></div>
            )}
        </div>
    );
  }

  export default Home;