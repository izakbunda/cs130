import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Note} from "./note";
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { NoteAdder } from "./noteAdder";
//import '../css/folder.css';
import '../css/index.css';


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
            <div>
                <h3>Top {name}</h3>
                <Button onClick={toggleIsAdding} icon={<img src=".././public/add_foloder_icon.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} />
                {isAdding ? (
                    <NoteAdder addNote={addNote} testing="test"/>
                ) : (
                    <></>
                )}
            </div>
            <div>
                {notes.map((note) => 
                    <Note noteInfo={note} deleteNoteFunc={deleteNote}/>
                )}
                <p>Bottom</p>
            </div>
        </>
    )
}

