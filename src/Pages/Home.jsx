import "../App.css";
import Button from '../Component/Button';
import React, { useState } from 'react';
const Home =() => {
    const [loading, setLoading] = useState(false);
    const handleButtonClick = (props) => {
        console.log(props);
        if(props.roomFree){
            setLoading(true);
        }
        else{
            setLoading(false);
        }
        console.log(`Button was ${props.label} clicked in App.js`);
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