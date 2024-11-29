import React, { useEffect, useState, useRef } from 'react'
import { Task } from './task'

import '../css/task.css'
import '../css/note.css'

import add_icon from '../assets/add_icon.svg'
import trash_icon from '../assets/trash_icon.svg'

function Note({ name, noteId, onClick, onCheckboxChange }) {
  const [tasks, setTasks] = useState([])
  const [creatingTask, setCreatingTask] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [clickedOnce, setClickedOnce] = useState(false)
  const buttonRef = useRef(null)

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckedBox = (checked, id) => {
    // console.log('In note: checkbox state from child:', checked)
    setIsChecked(checked)
    onCheckboxChange(checked, id)
  }

  const handleClick = () => {
    if (!clickedOnce) {
      setClickedOnce(true)
    } else {
      if (onClick) {
        onClick(noteId)
      }
    }
  }

  const fetchTasks = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/tasks/${noteId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }

      const data = await resp.json()
      setTasks(data)
    } catch (error) {
      alert('Failed to fetch notes, please try again later')
      console.error('Error fetching tasks:', error)
    }
  }

  const createTask = async () => {
    if (!taskInput.trim()) {
      alert('Task cannot be empty.')
      return
    }

    try {
      const resp = await fetch(`http://localhost:3001/tasks/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskInput })
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }

      const newTask = await resp.json()

      // update Tasks
      setTasks((prevTasks) => [...prevTasks, newTask])
    } catch (error) {
      alert('Failed to create task. Please try again.')
      console.error('Error creating task:', error)
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      createTask()
      setTaskInput('')
      setCreatingTask(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setClickedOnce(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className="note-container" id={noteId}>
      <div className="header-container" id={noteId}>
        <div className="left-half" id={noteId}>
          <img
            src={add_icon}
            className="add-icon"
            onClick={() => setCreatingTask(!creatingTask)}
            id={noteId}
          />
          <h4 id={noteId}>{name}</h4>
        </div>
        <div
          ref={buttonRef}
          className={['right-half', clickedOnce && 'clicked'].filter(Boolean).join(' ')}
          onClick={handleClick}
          id={noteId}
        >
          <img src={trash_icon} className="trash-icon" />
        </div>
      </div>
      {tasks.map((task) => {
        return (
          <Task
            key={task._id}
            id={task._id}
            status={task.status}
            taskText={task.name}
            startDate={task.creationDate}
            dueDate={task.dueDate}
            category={task.category}
            onCheckboxChange={handleCheckedBox}
          />
        )
      })}
      {creatingTask && (
        <input
          type="text"
          placeholder="add a new task!"
          className="task-input"
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleEnter}
          autoFocus
        />
      )}
    </div>
  )
}

export default Note
