import React, { useState, useEffect, useRef } from 'react'
import { TaskProgressBar } from './taskProgressBar'
import '../css/task.css'

export const Task = ({ taskText, id, status, startDate, dueDate, category, onCheckboxChange }) => {
  const [checked, setChecked] = useState(false)
  const [changeInPoints, setChangeInPoints] = useState(0)

  const isFirstRender = useRef(true) // Track initial render

  useEffect(() => {
    setChecked(status === 'pending' ? false : true)
  }, [])

  const handleChange = (event) => {
    const isChecked = event.target.checked
    setChecked(isChecked) // directly use event's value
    onCheckboxChange(isChecked, id) // notify parent
  }

  const catToColor = {
    easy: '5px solid green',
    medium: '5px solid orange',
    hard: '5px solid red'
  }

  return (
    <div className="task-container" id={id}>
      <div className="checkbox-container" id={id}>
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleChange}
          id={id}
          checked={checked}
        />
      </div>
      <div className="task-name-container" id={id}>
        <p className={`${checked ? 'task-text-completed' : 'task-text'}`} id={id}>
          {taskText}
        </p>
        {dueDate && <TaskProgressBar startDate={startDate} endDate={dueDate} id={id} />}
      </div>
      <div style={{ alignItem: 'center' }}>
        <div className="category-indicator" style={{ border: catToColor[category] }}></div>
      </div>
    </div>
  )
}
