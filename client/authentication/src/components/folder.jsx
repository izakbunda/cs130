import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Note} from "./note";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { NoteAdder } from "./noteAdder";
//import '../css/folder.css';
//import '../css/index.css';


export const Folder = ({name}) => {
    const [notes, setNotes] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isAdding, setIsAdding] = useState(true);

    const addNote = (noteName) => {
        if (noteName) {
            setNotes([...notes, {
                id: uuidv4(),
                title: noteName,
            }])
        }
    }
    const deleteNote = (id) => {
        setNotes(notes.filter((note) => 
            note.id != id
        ));
    }

    const toggleIsAdding = () => {
        setIsAdding(!isAdding);
    }

    return (
        <div className='app-container'>
            <header className='fixed-header'>
                <h3>Top {name}</h3>
                <FontAwesomeIcon className="edit-icon" icon={faPlus} onClick={() => toggleIsAdding()} />
                {isAdding ? (
                    <NoteAdder addNote={addNote} testing="test"/>
                ) : (
                    <></>
                )}
            </header>
            <div className='scrollable-content'>
                {notes.map((note) => 
                    <Note noteInfo={note} deleteNoteFunc={deleteNote}/>
                )}
                <p>Bottom</p>
            </div>
        </div>
    )
}

