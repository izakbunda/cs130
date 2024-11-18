import React, {useState} from 'react'
//import DateTimePicker from 'react-datetime-picker';
import {DateTimePicker} from './dateTime';

export const TaskAdder = ({addTask}) => {
  // track states (value being typed)
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleDateTimeChange = (dateTime) => {
    setDueDate(dateTime);
  };

  // update the task name
  const handleSubmit = (e) => {
    // prevent default action
      e.preventDefault();
      if ((value) && (dueDate)) {
        // add todo
        addTask(value, dueDate);
        // clear form after submission
        setValue('');
        setDueDate('');
      }
    };

  // return UI components
  return (
    <form onSubmit={handleSubmit} className="TaskAdder">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputAdder" placeholder='What is the task today?' />
      <DateTimePicker onDateTimeChange={handleDateTimeChange} value={value} />
      <button type="submit" className='TaskAddButton'>Add Task</button>
    </form>
  )
}
