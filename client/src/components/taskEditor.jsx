import React, {useState} from 'react'
import {DateTimePicker} from './dateTime';
import Button from "../components/button";

export const TaskEditor = ({editTask, todo, deleteTaskFunc}) => {
  // convert todo.end to a string
  let formattedDueDate = null;
  if (todo.end != null) {
    formattedDueDate = todo.end.toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    formattedDueDate = formattedDueDate.replace(', ', 'T');
  }

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
    if(value) {
      if (dateTimeDue.getTime() - todo.start.getTime() > 0) {
        // due date still after
        editTask(value, dateTimeDue, todo.id);
      } else {
        // due date set to before
        editTask(value, null, todo.id);
      }
    }
  };

  // return UI component
  return (
    <>
      <form onSubmit={handleSubmit} className="TaskEditor">
        <h2>New Name</h2>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputEditor" placeholder='New name' />
        {todo.end != null ? (
          <DateTimePicker onDateTimeChange={handleDateTimeChange} title={"New due date: "} value={value} defaultDate={dueDate.slice(0,10)} defaultTime={dueDate.slice(11,19)}/>
        ) : (
          <DateTimePicker onDateTimeChange={handleDateTimeChange} title={"New due date: "} value={value}/>
        )}
        
        <button type="submit" className='TaskEditButton'>Update Task</button>
      </form>
      <Button onClick={() => deleteTaskFunc(todo.id)} icon={<img src="../../public/trash_icon.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} />
    </>
  )
}
