import "../App.css";
import logo from "../logo.svg";
import Button from '../Component/Button';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Home =() => {
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();
    const handleButtonClick = (props) => {
        if(props.roomFree){
            setLoading(true);
        }
        else{
            setLoading(false);
            console.log("Navigate: ", props);
            navigate("./toss", { state: props });
        }
        console.log(`Button was ${props} clicked in App.js`);
    };

    return (
        <div className="homePage">
            <div className="button-container">
                {loading && <div className="loader"></div>}
                <Button label="Play with Computer" onClick={handleButtonClick} disabled={true}/>
                <Button label="Play with Stranger" onClick={handleButtonClick} />
                <Button label="Play with Friends" onClick={handleButtonClick} disabled={true}/>
            </div>
        </div>

    );
  }

  export default Home;