import React, { useState, useEffect, useRef } from 'react';
import '../css/button.css';

const Button = ({ text, icon }) => {
  const [clickedOnce, setClickedOnce] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (!clickedOnce) {
    
      setClickedOnce(true);
    } else {
      
      console.log('Second click action!');
      
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setClickedOnce(false); 
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <button 
      ref={buttonRef}
      className={`rounded-button ${clickedOnce ? 'clicked-button' : ''}`} 
      onClick={handleClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <h4 className="button-text">{text}</h4>
    </button>
  );
};

export default Button;

