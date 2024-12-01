// Import native stuff
import React, { useState } from 'react';

function DateTimePicker({ top, left, defaultDate, defaultTime, title, onPress, actionOnInvalid }) {
    // format information before storing in local states
    const providedDate = defaultDate ? defaultDate : '';
    const providedTime = defaultTime ? defaultTime : '';

    // Local States
    const [date, setDate] = useState(providedDate);
    const [time, setTime] = useState(providedTime);
    
    // update data when date is changed
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    // update data when time is changed
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    // when submit button is pressed, alert when invalid data
    const handleSubmit = () => {
        if(date && time) {
            onPress(date+"T"+time+":00");
        } else if (date) {
            console.log("no time");
            alert("No time was set");
            actionOnInvalid();
        } else {
            console.log("no date")
            alert("No date was set");
            actionOnInvalid();
        }
    };

    // return progress bar UI
    return (
        <div className='due-date-menu' style={{ top: top, left: left }}>
            <label >New Date</label>
            <div className='due-date-input-wrapper'>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className='date-input-box'
                />
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className='time-input-box'
                />
            </div>
            <button className='date-submit-button'onClick={handleSubmit}>Set Date</button>
        </div>
    );
};

export default DateTimePicker;