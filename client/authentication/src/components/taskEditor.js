import React, {useState} from 'react'
import {DateTimePicker} from './dateTime';

export const TaskEditor = ({editTask, todo}) => {
  // convert todo.end to a string
  let formattedDueDate = todo.end.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  formattedDueDate = formattedDueDate.replace(', ', 'T');

  // track states (value being typed in)
  const [value, setValue] = useState(todo.todo);
  const [dueDate, setDueDate] = useState(formattedDueDate);

  const handleDateTimeChange = (dateTime) => {
    setDueDate(dateTime);
  };

  // add TaskEditor Bar
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    const dateTimeDue = new Date(dueDate);
    editTask(value, dateTimeDue, todo.id);
  };

  // return UI component
  return (
    <form onSubmit={handleSubmit} className="TaskEditor">
      {console.log(dueDate)}
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputEditor" placeholder='Update task' />
      <DateTimePicker onDateTimeChange={handleDateTimeChange} title={"New due date: "} value={value} defaultDate={dueDate.slice(0,10)} defaultTime={dueDate.slice(11,19)}/>
      <button type="submit" className='TaskEditButton'>Update Task</button>
    </form>
  )
}
