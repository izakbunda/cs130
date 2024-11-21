import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Note} from "./note";
import { NoteAdder } from "./noteAdder";

import Button from "../components/button";

import '../css/folder.css';


export const Folder = ({name}) => {
    const [notes, setNotes] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

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
        <>
            <div className='folder-header' >
                <img src="../../public/folder_icon.svg" className='folder-icon'/>
                <h4>Top {name}</h4>
                <Button className='temp-button' onClick={toggleIsAdding} icon={<img src="../../public/add_folder_icon.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} />
                
            </div>
            <div className='notes-section'>
                {notes.map((note) => 
                    <Note noteInfo={note} deleteNoteFunc={deleteNote}/>
                )}
                {isAdding ? (
                    <NoteAdder addNote={addNote} testing="test"/>
                ) : (
                    <></>
                )}
                <p>Bottom</p>
            </div>
        </>
    )
}

