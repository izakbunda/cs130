import React from "react";
import PropTypes from 'prop-types';
import '../css/progress-bar.css';
import '../css/index.css';

const BASE_EXP = 100; 
const EXPONENT = 1.5; 
const EXP_PER_TASK = 250; // New constant for EXP per task

const calculateRequiredExp = (level) => {
    return BASE_EXP * Math.pow(level, EXPONENT);
};

const ProgressBar = ({ currentExp, level, page }) => {
    const maxExp = calculateRequiredExp(level); 
  
    // Calculate progress as a percentage
    const progress = Math.min((currentExp / maxExp) * 100, 100); 
  
    // Determine the class based on the page prop
    const className = page === 'Landing' ? 'progress-bar progress-bar-landing' : 'progress-bar progress-bar-other';
  
    return (
      <div className="progress-bar-container">
        <progress value={currentExp} max={maxExp} className={className} />
        <div className="progress-text">
          {`Level ${level}: ${Math.round(currentExp)}/${Math.round(maxExp)} EXP`}
        </div>
      </div>
    );
};

ProgressBar.propTypes = {
    currentExp: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    page: PropTypes.string, 
};

export default ProgressBar;
