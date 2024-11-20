import React, { useState, useEffect } from 'react';

export const ProgressBar = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Calculate the total duration and progress percentage
  const calculateProgress = () => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();

    const totalDuration = end - start;
    const elapsedTime = now - start;
    const progressPercentage = Math.min((elapsedTime / totalDuration) * 100, 100);
    /*
    console.log("calculating progress");
    console.log("startdate ", startDate);
    console.log("enddate ", endDate);
    console.log("now  ", now);
    console.log("elapsed", elapsedTime);
    console.log("total", totalDuration);
    console.log("progress", progressPercentage);
    console.log("calculating progress");
    */
    setProgress(progressPercentage);
    calculateTimeRemaining(end - now);

  };

  // Calculate the time remaining
  const calculateTimeRemaining = (milliseconds) => {
    if (milliseconds <= 0) {
      setTimeRemaining('Past due');
      return;
    }

    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      setTimeRemaining(`Due in ${days} days`);
    } else if (hours > 0) {
      setTimeRemaining(`Due in ${hours} hours`);
    } else {
      setTimeRemaining(`Due in ${minutes} minutes`);
    }
  };

  useEffect(() => {
    calculateProgress();

    // Update progress every minute
    const interval = setInterval(() => {
      calculateProgress();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <div
        style={{
          height: '20px',
          width: '100%',
          backgroundColor: '#ddd',
          borderRadius: '5px',
          overflow: 'hidden',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#4caf50',
            borderRadius: '5px 0 0 5px',
            transition: 'width 0.5s ease-in-out',
          }}
        ></div>
      </div>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{timeRemaining}</p>
    </div>
  );
};
