import React from 'react'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'


export const Task = ({todo, deleteTask, editTask, toggleComplete}) => {
  return (
    <div className="Task">
        <p className={`${todo.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(todo.id)}>{todo.todo}</p>
        <div>
          <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTask(todo.id)} />
          <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTask(todo.id)} />
        </div>
    </div>
  )
}
