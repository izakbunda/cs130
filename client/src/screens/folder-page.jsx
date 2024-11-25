import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GridLayout from "react-grid-layout";
import "../css/index.css";
import "../css/folder-grid.css";
import ProgressBar from "../components/progress-bar";
import PetIcon from "../components/pet";
import Button from "../components/button";
import Folder from "../components/folder";
import ContextMenu from "../components/contextMenu";

function FolderPage() {
    const navigate = useNavigate();
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [folderInput, setFolderInput] = useState('');
    const [folders, setFolders] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [folderId, setFolderId] = useState('');

    const options = [
        {
            label: "Edit Folder", 
            action: () => {console.log('edit folder');}
        },
        {
            label: "Delete Folder",
            action: () => console.log('delete folder')
        }
    ]

    const [samplePet] = useState({
        name: 'Sharkie',
        level: 13,
        exp: 600,
    });

    const layoutFolder = [
        { i: "pet", x: 0, y: 0, w: 4, h: 2, static: true },
        { i: "title", x: 4, y: 0, w: 8, h: 1, static: true },
        { i: "buttons", x: 12, y: 0, w: 4, h: 1, static: true },
        { i: "progress", x: 4, y: 1, w: 12, h: 1, static: true },
    ];

    const gridProps = {
        className: "folder-grid",
        layout: layoutFolder,
        cols: 16,
        rowHeight: 40,
        width: 406, 
    };

    const getUserId = () => {
        const userId = localStorage.getItem("user_id"); // Replace "userId" with the actual key used to store it
        if (!userId) {
            console.error("User ID not found in local storage.");
            return null;
        }
        return userId;
    };

    const fetchFolders = async () => {
        try {
            const userId = getUserId();
            const resp = await fetch(`http://localhost:3001/folders/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const data = await resp.json();
            setFolders(data);
        } catch (error) {
            alert("Failed to fetch folders, please try again later");
            console.error("Error fetching folders:", error);
        }
    };

    const createFolder = async () => {
        if (!folderInput.trim()) {
            alert("Folder name cannot be empty.");
            return;
        }

        try {
            const userId = getUserId();
            const resp = await fetch(`http://localhost:3001/folders/${userId}`, {
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ name: folderInput })
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const newFolder = await resp.json();
            console.log(newFolder);

            // update folders 
            setFolders((prevFolders) => [...prevFolders, newFolder]);
        } catch (error) {
            alert("Failed to create folder. Please try again.");
            console.error("Error creating folder:", error);
        }
    };

    const deleteFolder = async (folderId) => {
        try {
            const resp = await fetch(`http://localhost:3001/folders/${folderId}`, {
                method: "DELETE",
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            // remove folder from local state
            setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
        } catch (error) {
            alert("Failed to delete folder, please try again.");
            console.error("Error deleting folder:", error);
        }
    };
 
    const updateFolder = async (folderId, folderName) => {
        if (!folderName.trim()) {
            alert("Folder name cannot be empty.");
            return
        }

        try {
            const resp = await fetch(`http://localhost:3001/folders/${folderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ name: folderName })
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const updatedFolder = await resp.json;

            // Update the folder in the local state
            setFolders((prevFolders) =>
                prevFolders.map((folder) =>
                    folder._id === updatedFolder.folder._id ? updatedFolder.folder : folder
                )
            );
        } catch (error) {
            alert("Failed to update folder. Please try again.");
            console.error("Error updating folder:", error);
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            createFolder();
            setFolderInput("");
            setCreatingFolder(false);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        setPoints({ x: e.pageX, y: e.pageY });
        setClicked(true);
        // fetch folder id
        console.log(document.elementFromPoint(e.pageX, e.pageY).id);
        setFolderId(document.elementFromPoint(e.pageX, e.pageY).id);
    };

    const closeContextMenu = () => {
        setClicked(false);
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            setClicked(false);
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

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
                        icon={<img src="../public/add_folder_icon.svg" alt="Add Folder Icon" style={{ width: '25px', height: '25px' }} />}
                        onClick={() => {setCreatingFolder(!creatingFolder)}}
                        noOutline
                        className="folder-button large-icon"
                    />
                    <Button
                        icon={<img src="../public/home_icon.svg" alt="Home Icon" style={{ width: '25px', height: '25px' }} />}
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
            <div className="folders-list">
                {clicked && (
                    <ContextMenu
                        left={points.x}
                        top={points.y}
                        options={options}
                        onClose={closeContextMenu}
                    />
                )}
                {folders.map((folder) => (
                    <div onContextMenu={(e) => handleRightClick(e, folder)}>
                        <Folder
                            key={folder._id}
                            name={folder.name}
                            id={folder._id}
                            notesNumber={folder.notes.length}
                            onClick={() => navigate('/note', { state: folder })}
                            onUpdateFolderName={updateFolder}
                            className='folder-page-folder'
                        /> 
                    </div>
                ))}
                {creatingFolder && (
                    <div className="folder-container">
                        <div className="left-half">
                            <img src="../../public/folder_icon.svg" className='folder-icon'/>
                            <input
                                type='text'
                                placeholder="add a new folder!"
                                className="folder-input"
                                onChange={(e) => setFolderInput(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default FolderPage;