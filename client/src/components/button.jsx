import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../css/button.css';

const Button = ({ text, icon, onClick, noOutline, className }) => {
  const [clickedOnce, setClickedOnce] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (!clickedOnce) {
      setClickedOnce(true);
    } else {
      if (onClick) {
        onClick(); 
      }
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
      className={`rounded-button ${clickedOnce ? 'clicked-button' : ''} ${noOutline ? 'no-outline' : ''} ${className}`}
      onClick={handleClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text && <h4 className="button-text">{text}</h4>}
      {className === 'folder-page-folder' && <p className='notes-number'>3</p>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  noOutline: PropTypes.bool,
  className: PropTypes.string, 
};

Button.defaultProps = {
  text: '',
  noOutline: false,
  className: '',
};

export default Button;