import "../App.css";
import Button from '../Component/Button';
import React, { useState } from 'react';
const Home =() => {
    const [loading, setLoading] = useState(false);
    const handleButtonClick = (props) => {
        setLoading(true);
        console.log(`Button was ${props.label} clicked in App.js`);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="button-container">
        {loading && <div className="loader"></div>}
        <Button label="Play with Computer" onClick={handleButtonClick}/>
        <Button label="Play with Friends" onClick={handleButtonClick}/>
        <Button label="Play with Stranger" onClick={handleButtonClick} />
        {/* {loading && <div className="loader"></div>} */}
    </div>
    );
  }

  export default Home;