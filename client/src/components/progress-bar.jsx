import React from "react";
import PropTypes from 'prop-types';
import '../css/progress-bar.css'
import '../css/index.css'

const ProgressBar = ({ value, max, page }) => {
    
    const additionalClass = page === "Landing" ? 'progress-bar-landing' : 'progress-bar-other';

    return (
        <progress value={value} max={max} className={`progress-bar ${additionalClass}`} />
    );
};

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
    page: PropTypes.string,
};

ProgressBar.defaultProps = {
    max: 500,
    page: '',
};

export default ProgressBar;