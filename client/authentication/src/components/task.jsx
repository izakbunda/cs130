import React from 'react'
import {ProgressBar} from './progressBar';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'


export const Task = ({todo, editTask, toggleComplete}) => {
  return (
    <div className="Task">
        <p className={`${todo.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(todo.id)}>{todo.todo}</p>
        <div>
          <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTask(todo.id)} />
        </div>
        {todo.end == null ? (
          <></>
        ) : (
          <ProgressBar startDate={todo.start} endDate={todo.end} />
        )}
        
    </div>
  )
}
