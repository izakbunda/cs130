import {React, useState, useEffect} from "react";
import '../css/clock.css'
/*
  Clock component that will dynamically display the date and time 
  On the Landing Page.
*/

function useTime() {
    const [time, setTime] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

function Clock(){
    const time = useTime();

    const formattedDate = time.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit'
    });
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return(
        <div className="clock-continaer">
            <span className="clock-date">{formattedDate}</span>
            <span className="clock-time">{formattedTime}</span>
        </div>
    )
}

export default Clock;