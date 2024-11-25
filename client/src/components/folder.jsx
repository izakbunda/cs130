import React, { useState, useEffect, useRef } from "react";
import PropTypes, { bool } from 'prop-types';
import '../css/folder.css';
import '../css/index.css';

function Folder({ name, notesNumber, onClick, className }) {
    const [clickedOnce, setClickedOnce] = useState(false);
    const [folderName, setFolderName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    const folderRef = useRef(null);

    const handleClick = () => {
        if (!clickedOnce) {
            setClickedOnce(true);
        } else {
            if (onClick) {
                onClick(); 
            }
            console.log('Second click action!');
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            createFolder();
            setFolderInput("");
            setCreatingFolder(false);
        }
    };

    const handleBlur = async () => {
        setIsEditing(false);
        if (folderName.trim() && folderName !== name) {
            console.log("call parent handler");
            // await onUpdateFolderName(folder._id, folderName); // Call parent handler
        } else {
            setFolderName(folder.name); // Revert to original name if no change
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (folderRef.current && !folderRef.current.contains(event.target)) {
                setClickedOnce(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div 
            ref={folderRef}
            className={['folder-container', clickedOnce && 'clicked'].filter(Boolean).join(' ')}
            onClick={handleClick}
        >
            <div className="left-half">
                <img src="../../public/folder_icon.svg" className='folder-icon'/>
                {isEditing ? (
                    <input
                        type='text'
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleEnter}
                        autoFocus
                        className="folder-input"
                    />
                ):(
                    <div onDoubleClick={() => setIsEditing(true)}>
                        <h4>{name}</h4>
                    </div>
                    
                )}
            </div>
            {className === 'folder-page-folder' && 
                <div className="right-half">
                    <p className="notes-number">{notesNumber}</p>
                </div>
            }
        </div>
    )
};

export default Folder;