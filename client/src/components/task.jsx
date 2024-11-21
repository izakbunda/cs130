import React from 'react'
import {ProgressBar} from './progressBar';
import Button from "../components/button";

export const Task = ({todo, editTask, toggleComplete}) => {
  return (
    <div className="Task">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <p className={`${todo.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(todo.id)}>{todo.todo}</p>
        <div>
          <Button onClick={() => editTask(todo.id)} icon={<img src=".././public/todo.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} />
        </div>
        {todo.end == null ? (
          <></>
        ) : (
          <ProgressBar startDate={todo.start} endDate={todo.end} />
        )}
        
    </div>
  )
}
