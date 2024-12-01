// Import native stuff
import React, { useState, useEffect, useRef } from 'react'
import PropTypes, { bool } from 'prop-types'
import { useLocation } from 'react-router-dom';

// Import styling sheets
import '../css/index.css';
import '../css/folder.css';

// Import custom icons
import folder_icon from '../assets/folder_icon.svg';
import open_folder_icon from '../assets/open_folder.svg';

function Folder({ name, id, notesNumber, onClick, onUpdateFolderName, className, editing, endEditing}) {
    // Local States
    const [clickedOnce, setClickedOnce] = useState(false);
    const [folderName, setFolderName] = useState(name);

    // folderIcon path
    const folderIcon = location.pathname.includes('/note') ? open_folder_icon : folder_icon;

    const folderRef = useRef(null);
    const location = useLocation();

    // Make sure all actions require a double click
    const handleClick = () => {
        if (!clickedOnce) {
            setClickedOnce(true);
        } else {
            if (onClick && !editing) {
                onClick();
            }
            console.log('Second click action!');
        }
    }

    // When 'enter' pressed, update the folder name
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            onUpdateFolderName(id, folderName);
            endEditing();
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (folderRef.current && !folderRef.current.contains(event.target)) {
                setClickedOnce(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        };
    }, []);

    return (
        <div
            ref={folderRef}
            id={id}
            className={['folder-container', clickedOnce && 'clicked'].filter(Boolean).join(' ')}
            onClick={handleClick}
        >
            <div className="left-half" id={id}>
                <img src={folderIcon} className="folder-icon" id={id} />
                {editing ? (
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onKeyDown={handleEnter}
                        autoFocus
                        className="folder-input"
                    />
                ) : (
                    <h4 id={id}>{folderName}</h4>
                )}
            </div>
            {className === 'folder-page-folder' && (
                <div className="right-half" id={id}>
                    <p className="notes-number" id={id}>{notesNumber}</p>
                </div>
            )}
        </div>
    );
}

export default Folder;
