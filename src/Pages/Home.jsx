import "../App.css";
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
            navigate("./Playground");
        }
        console.log(`Button was ${props} clicked in App.js`);
    };

    return (
        <div className="button-container">
        {loading && <div className="loader"></div>}
        <Button label="Play with Computer" onClick={handleButtonClick}/>
        <Button label="Play with Friends" onClick={handleButtonClick}/>
        <Button label="Play with Stranger" onClick={handleButtonClick} />
    </div>
    );
  }

  export default Home;