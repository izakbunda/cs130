import React, { useEffect, useState, useRef } from 'react'
import { Task } from './task'

import '../css/task.css'
import '../css/note.css'
import '../css/folder-grid.css'

import add_icon from '../assets/add_icon.svg'
import trash_icon from '../assets/trash_icon.svg'

import DateTimePicker from '../components/dateTime'
import '../css/dateTime.css'

function Note({ id, name, noteId, onDelete, editingNote, editingTask, editingDate, deletingTask, editingCategory, onUpdateNoteName, endEditing, points, onClick, onCheckboxChange }) {
  //console.log("note:", id)
  const [tasks, setTasks] = useState([])
  const [creatingTask, setCreatingTask] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [clickedOnce, setClickedOnce] = useState(false)
  const [noteName, setNoteName] = useState(name)

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
      if (onDelete) {
        onDelete(noteId)
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
      alert('Failed to fetch tasks, please try again later')
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
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }

      const newTask = await resp.json()

      // update Tasks
      setTasks((prevTasks) => [...prevTasks, newTask])
    } catch (error) {
      alert('Failed to create task. Please try again.')
      console.error('Error creating task:', error)
    }
  }

  const updateTaskName = async (taskId, taskName) => {
    try {
      const resp = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName})
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }
    } catch (error) {
      alert('Failed to update task, please try again later');
      console.error('Error updating task:', error);
    }
  }

  const updateTaskDueDate = async (taskId, dueDate) => {
    try {
      const resp = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dueDate: dueDate})
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }
    } catch (error) {
      alert('Failed to update task, please try again later');
      console.error('Error updating task:', error);
    }
  }

  const updateTaskCategory = async (taskId, category) => {
    try {
      const resp = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category})
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }

      endEditing();
    } catch (error) {
      alert('Failed to update task, please try again later');
      console.error('Error updating task:', error);
    }
  }

  const handleTaskEnter = (e) => {
    if (e.key === 'Enter') {
      createTask()
      setTaskInput('')
      setCreatingTask(false)
    }
  }

  const handleNoteEnter = (e) => {
    if (e.key === 'Enter') {
      onUpdateNoteName(noteId, noteName);
      endEditing();
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [deletingTask, editingCategory]) // TODO: may have to add stuff here?

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
          {editingNote ? (
            <input
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              onKeyDown={handleNoteEnter}
              autoFocus
              className="note-input"
            />
          ):(
            <h4 id={noteId}>{noteName}</h4>
          )}
          
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
            editingTask={editingTask && (task._id === id) ? true : false}
            onEditTask={updateTaskName}
            editingDate={editingDate && (task._id === id) ? true : false}
            onEditDate={updateTaskDueDate}
            editingCategory={editingCategory && (task._id === id) ? true : false}
            onEditCategory={updateTaskCategory}
            endEditing={endEditing}
            points={points}
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
          onKeyDown={handleTaskEnter}
          autoFocus
        />
      )}
    </div>
  )
}

export default Note
