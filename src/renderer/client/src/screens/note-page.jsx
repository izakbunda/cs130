import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GridLayout from 'react-grid-layout'
import '../css/index.css'
import '../css/folder-grid.css'
import '../css/folder.css'
import ProgressBar from '../components/progress-bar'
import PetIcon from '../components/pet'
import Button from '../components/button'
import Folder from '../components/folder'
import Note from '../components/note'
import ContextMenu from '../components/contextMenu'

import add_notes_icon from '../assets/add_notes_icon.svg'
import home_icon from '../assets/home_icon.svg'
import add_icon from '../assets/add_icon.svg'

function NotePage() {
  const navigate = useNavigate()
  const location = useLocation() // to get folder name
  const folder = location.state

  const [creatingNote, setCreatingNote] = useState(false)
  const [editingNote, setEditingNote] = useState(false)
  const [noteInput, setNoteInput] = useState('')
  const [notes, setNotes] = useState([])
  const [clicked, setClicked] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [noteId, setNoteId] = useState('')

  // need to handle the actions for each option
  const options = [
    {
      label: 'Edit Note',
      action: () => setEditingNote(true)
    },
    {
      label: 'Edit Task',
      action: () => console.log('edit task')
    },
    {
      label: 'Edit Due Date',
      action: () => console.log('edit due date')
    },
    {
      label: 'Edit Category',
      action: () => console.log('edit category')
    }
  ]

  const [samplePet] = useState({
    name: 'Sharkie',
    level: 13,
    exp: 600
  })

  const layoutFolder = [
    { i: 'pet', x: 0, y: 0, w: 4, h: 2, static: true },
    { i: 'title', x: 4, y: 0, w: 8, h: 1, static: true },
    { i: 'buttons', x: 12, y: 0, w: 4, h: 1, static: true },
    { i: 'progress', x: 4, y: 1, w: 12, h: 1, static: true }
  ]

  const gridProps = {
    className: 'folder-grid',
    layout: layoutFolder,
    cols: 16,
    rowHeight: 40,
    width: 406
  }

  const fetchNotes = async () => {
    try {
      const folderId = folder._id
      const resp = await fetch(`http://localhost:3001/notes/${folderId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }

      const data = await resp.json()
      setNotes(data)
    } catch (error) {
      alert('Failed to fetch notes, please try again.')
      console.error('Error fetching notes:', error)
    }
  }

  const createNote = async () => {
    if (!noteInput.trim()) {
      alert('Note name cannot be empty.')
      return
    }

    try {
      const folderId = folder._id
      const resp = await fetch(`http://localhost:3001/notes/${folderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: noteInput })
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }

      const newNote = await resp.json()
      console.log(newNote)

      // update notes
      setNotes((prevNotes) => [...prevNotes, newNote])
    } catch (error) {
      alert('Failed to create note. Please try again.')
      console.error('Error creating note:', error)
    }
  }

  const deleteNote = async (noteId) => {
    try {
      const resp = await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: 'DELETE'
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }

      // remove note from local state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId))
    } catch (error) {
      alert('Failed to delete note, please try again.')
      console.error('Failed to delete note:', error)
    }
  }

  const updateNote = async (noteId, noteName) => {
    try {
      const resp = await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: noteName })
      })

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`)
      }
    } catch (error) {
      alert('Failed to update note, please try again.')
      console.error('Faild to update note:', error)
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      createNote()
      setNoteInput('')
      setCreatingNote(false)
    }
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    setPoints({ x: e.pageX, y: e.pageY })
    setClicked(true)
    console.log(document.elementFromPoint(e.pageX, e.pageY).id)
    setNoteId(document.elementFromPoint(e.pageX, e.pageY).id)
  }

  const closeContextMenu = () => {
    setClicked(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      setClicked(false)
    }

    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className="folder-page-container">
      <GridLayout {...gridProps}>
        <div key="pet" className="grid-item">
          <PetIcon
            name={samplePet.name}
            level={samplePet.level}
            exp={samplePet.exp}
            page="Folder"
          />
        </div>
        <div key="title" className="grid-item">
          <h2>TODOGOTCHI</h2>
        </div>
        <div key="buttons" className="grid-item">
          <div className="button-container">
            <Button
              icon={
                <img
                  src={add_notes_icon}
                  alt="Add Note Icon"
                  style={{ width: '25px', height: '25px' }}
                />
              }
              onClick={() => setCreatingNote(true)}
              noOutline
              className="folder-button large-icon"
            />
            <Button
              icon={
                <img src={home_icon} alt="Home Icon" style={{ width: '25px', height: '25px' }} />
              }
              onClick={() => navigate('/landing')}
              noOutline
              className="folder-button large-icon"
            />
          </div>
        </div>
        <div key="progress" className="grid-item">
          <ProgressBar currentExp={samplePet.exp} level={samplePet.level} page="Folder" />
        </div>
      </GridLayout>
      <Folder name={folder.name} onClick={() => navigate('/folder')} className="note-page-folder" />
      <div className="notes-list">
        {clicked && (
          <ContextMenu
            left={points.x}
            top={points.y}
            options={options}
            onClose={closeContextMenu}
          />
        )}
        {notes.map((note) => (
          <div onContextMenu={(e) => handleRightClick(e, 'task')} key={note._id}>
            <Note 
              key={note._id} 
              name={note.name} 
              noteId={note._id} 
              onClick={deleteNote}
              editing={note._id === noteId && editingNote ? true : false}
              onUpdateNoteName={updateNote}
              endEditing={() => setEditingNote(false)}
            />
          </div>
        ))}
        {creatingNote && (
          <div className="note-container">
            <div className="left-half">
              <img src={add_icon} className="add-icon" />
              <input
                type="text"
                placeholder="add a new note"
                className="note-input"
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={handleEnter}
                autofocus
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotePage
