// Import native stuff
import React, { useState, useEffect } from 'react';

// Import styling sheet
import "../css/task-progress-bar.css";

export const TaskProgressBar = ({ startDate, endDate }) => {
    // Local states
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
        //console.log("start: ", String(new Date(start)));
        //console.log("end: ", String(new Date(end)));
        //console.log("now", String(new Date(now)));
    };

    // Calculate the time remaining
    const calculateTimeRemaining = (milliseconds) => {
        if (milliseconds <= 0) {
            setTimeRemaining('Past due');
            return;
        }

        if (!milliseconds) {
            console.log("NaN time")
            console.log("start: ", startDate);
            console.log("due: ", endDate);
        }

        const seconds = Math.floor(milliseconds / 1000);
        //console.log("seconds: ", seconds)
        const minutes = Math.floor(seconds / 60);
        //console.log("minutes: ", minutes)
        const hours = Math.floor(minutes / 60);
        //console.log("hours: ", hours)
        const days = Math.floor(hours / 24);
        //console.log("days: ", days)

        if (days > 0) {
            if (days == 1) {
                setTimeRemaining(`Due in 1 day`);
            } else {
                setTimeRemaining(`Due in ${days} days`);
            }
        } else if (hours > 0) {
            if (hours == 1) {
                setTimeRemaining(`Due in 1 hour`);
            } else {
                setTimeRemaining(`Due in ${hours} hours`);
            }
        } else if (minutes > 0) {
            if (minutes == 1) {
                setTimeRemaining(`Due in 1 minute`);
            } else {
                setTimeRemaining(`Due in ${minutes} minutes`);
            }
        } else {
            if (seconds == 1) {
                setTimeRemaining(`Due in 1 second`);
            } else if (seconds == 0) {
                setTimeRemaining(`Due right now`);
            } else {
                setTimeRemaining(`Due in ${seconds} seconds`);
            }
        }
    };

    // update progress bar
    useEffect(() => {
        calculateProgress();

        // Update progress every second
        const interval = setInterval(() => {
            calculateProgress();
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [startDate, endDate]);

    return (
        <div className='bar-container'>
            <div className='bar-background'>
                <div className='bar-progress' style={{ width: `${progress}%`}}> </div>
            </div>
            <h6 className='task-progress-text'>{timeRemaining}</h6>
        </div>
    );
};
