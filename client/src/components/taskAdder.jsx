import React, {useState} from 'react'
//import DateTimePicker from 'react-datetime-picker';
import {DateTimePicker} from './dateTime';

export const TaskAdder = ({addTask}) => {
  // track states (value being typed)
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleDateTimeChange = (dateTime) => {
    setDueDate(dateTime);
    console.log(dateTime);
  };

  // update the task name
  const handleSubmit = (e) => {
    // prevent default action
      e.preventDefault();
      // fields must be filled out
      if (value) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        const localCurrentDate = new Date(formattedDate.replace(', ', 'T'));
        if (dueDate) {
          console.log("due date detected")
          // check due date is in the future
          
          const localDueDate = new Date(dueDate);
          if (localDueDate - localCurrentDate > 0) {
            // add todo
            addTask(value, localCurrentDate, localDueDate);
            console.log("adding task", localCurrentDate, localDueDate);
            // clear form after submission
            setValue('');
            setDueDate('');
          } else {
            console.log("Cannot add task due in the past");
          }
        } else {
          console.log("due date not detected")
          // add todo
          console.log("adding task with no date");
          addTask(value, localCurrentDate, null);
          // clear form after submission
          setValue('');
          setDueDate('');
        }
        
      }
    };

  // return UI components
  // <DateTimePicker title={"Due Date:"} onDateTimeChange={handleDateTimeChange} value={dueDate} />
  return (
    <form onSubmit={handleSubmit} className="TaskAdder">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputAdder" placeholder='What is the task today?' />
      <button type="submit" className='TaskAddButton'>Add Task</button>
    </form>
  )
}
