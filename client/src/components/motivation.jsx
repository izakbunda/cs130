import React, { useState, useEffect } from 'react';
import '../css/motivation.css';

const messages = [
    "Finish To-Do List items to LVL up your Todogotchi!",
    "Lock in! Lock in! Lock in",
    "WWED (What would Eggert do)?",
    "Your To-Do List isn't going to do itself...",
    "You are an academic weapon."
  ];
  
  const MotivationalMessage = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 30000); 
  
      return () => clearInterval(interval); 
    }, []);
  
    return (
      <div className="motivational-message-container">
        <h5 className="motivational-message">{messages[currentMessageIndex]}</h5>
      </div>
    );
  };
  
  export default MotivationalMessage;
