import React, {useState} from 'react'

export const TaskAdder = ({addTask}) => {
  // track states (value being typed)
  const [value, setValue] = useState('');

  // update the task name
  const handleSubmit = (e) => {
    // prevent default action
      e.preventDefault();
      if (value) {
        // add todo
        addTask(value);
        // clear form after submission
        setValue('');
      }
    };

  // return UI components
  return (
    <form onSubmit={handleSubmit} className="TaskAdder">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputAdder" placeholder='What is the task today?' />
      <button type="submit" className='TaskAddButton'>Add Task</button>
    </form>
  )
}
