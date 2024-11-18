import React, { useState } from 'react';

export const DateTimePicker = ({ onDateTimeChange }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
    handleChange(e.target.value, time);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    handleChange(date, e.target.value);
  };

  // Call the parent function with the updated date and time
  const handleChange = (selectedDate, selectedTime) => {
    if (onDateTimeChange) {
      onDateTimeChange(`${selectedDate}T${selectedTime}:00`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <label >Due Date:</label>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        style={{ padding: '5px' }}
      />
    </div>
  );
};
