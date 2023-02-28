import React from 'react'
import { useState, useEffect } from 'react';
const Toss = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="toss-page">
      <div className="toss-point">
        <div className="loading-animation">
          {isLoading ? (
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        ) : (
          <h1 className="word">You will bat first</h1>
        )}
          </div>
      </div>
    </div>
  
  )
}

export default Toss
