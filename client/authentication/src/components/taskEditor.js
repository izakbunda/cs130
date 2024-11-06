import React, {useState} from 'react'

export const TaskEditor = ({editTask, todo}) => {
  // track states (value being typed in)
  const [value, setValue] = useState(todo.todo);

  // add TaskEditor Bar
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTask(value, todo.id);
  };

  // return UI component
  return (
    <form onSubmit={handleSubmit} className="TaskEditor">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputEditor" placeholder='Update task' />
      <button type="submit" className='TaskEditButton'>Update Task</button>
    </form>
  )
}
