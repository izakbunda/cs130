// Import Native stuff
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GridLayout from 'react-grid-layout';

// Import our components
import Button from '../components/button';
import Folder from '../components/folder';
import PetIcon from '../components/pet';
import ContextMenu from '../components/contextMenu';
import ProgressBar from '../components/progress-bar';

// Import styling sheets
import '../css/index.css';
import '../css/folder-grid.css';

// Import custom icons
import home_icon from '../assets/home_icon.svg';
import folder_icon from '../assets/folder_icon.svg';
import add_folder_icon from '../assets/add_folder_icon.svg';

function FolderPage() {
    // Local States
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [folderInput, setFolderInput] = useState('');
    const [folders, setFolders] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [folderId, setFolderId] = useState('');
    const [editFolder, setEditFolder] = useState(false);

    // pet information
    const [pet, setPet] = useState({
        name: 'placeholder',
        level: 0, // Example starting level
        points: 0 // Example starting EXP
    });

    // Navigation functionality
    const navigate = useNavigate();

    // Options for right click context menu
    const options = [
        {
            label: 'Edit Folder',
            action: () => {
                setEditFolder(true);
            }
        },
        {
            label: 'Delete Folder',
            action: () => deleteFolder(folderId)
        }
    ];

    // layout for styling
    const layoutFolder = [
        { i: 'pet', x: 0, y: 0, w: 4, h: 2, static: true },
        { i: 'title', x: 4, y: 0, w: 8, h: 1, static: true },
        { i: 'buttons', x: 12, y: 0, w: 4, h: 1, static: true },
        { i: 'progress', x: 4, y: 1, w: 12, h: 1, static: true }
    ];

    // props for the grid
    const gridProps = {
        className: 'folder-grid',
        layout: layoutFolder,
        cols: 16,
        rowHeight: 40,
        width: 406
    };

    // get the user id
    const getUserId = () => {
        const userId = localStorage.getItem('user_id'); // Replace "userId" with the actual key used to store it
        if (!userId) {
            console.error('User ID not found in local storage.');
            return null;
        }
        return userId;
    }

    // FETCH PET FROM BACKEND (note: on this page, we do not need to update the pet)
    useEffect(() => {
        const fetchPet = async (petId) => {
            try {
                const response = await fetch(`http://localhost:3001/pets/${petId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const petData = await response.json();
                console.log('Fetched pet from backend:', petData);
                // Save pet to localStorage for future use
                localStorage.setItem('pet', JSON.stringify(petData));
                // Update state
                setPet(petData);
            } catch (error) {
                console.error('Failed to fetch pet:', error);
            }
        };

        const pet = localStorage.getItem('pet');
        console.log('Fetching pet from backend: ', pet);

        if (!pet) {
            const pet_id = localStorage.getItem('pet_id');
            // Fetch pet from backend if not in localStorage
            fetchPet(pet_id);
        } else {
            console.log('Pet found in localStorage:', JSON.parse(pet));
            setPet(JSON.parse(pet));
        }
    }, [navigate]);

    // FETCH folders from server
    const fetchFolders = async () => {
        try {
            const userId = getUserId();
            const resp = await fetch(`http://localhost:3001/folders/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const data = await resp.json();
            setFolders(data);
        } catch (error) {
            alert('Failed to fetch folders, please try again later');
            console.error('Error fetching folders:', error);
        }
    }

    // POST new folder to server
    const createFolder = async () => {
        if (!folderInput.trim()) {
            alert('Folder name cannot be empty.');
            return;
        }

        try {
            const userId = getUserId();
            const resp = await fetch(`http://localhost:3001/folders/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            alert('Failed to create folder. Please try again.');
            console.error('Error creating folder:', error);
        }
    }

    // DELETE folder from server
    const deleteFolder = async (folderId) => {
        try {
            const resp = await fetch(`http://localhost:3001/folders/${folderId}`, {
                method: 'DELETE'
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            // remove folder from local state
            setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
        } catch (error) {
            alert('Failed to delete folder, please try again.');
            console.error('Error deleting folder:', error);
        }
    };

    // UPDATE Folder to server
    const updateFolder = async (folderId, folderName) => {
        if (!folderName.trim()) {
            alert('Folder name cannot be empty.');
            return;
        }

        try {
            const resp = await fetch(`http://localhost:3001/folders/${folderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: folderName })
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const updatedFolder = await resp.json();

            // Update the folder in the local state
            setFolders((prevFolders) =>
                prevFolders.map((folder) => (folder._id === updatedFolder._id ? updatedFolder : folder))
            );
        } catch (error) {
            alert('Failed to update folder. Please try again.');
            console.error('Error updating folder:', error);
        }
    };

    // when done editing, reset editing statuses
    const endEditing = () => {
        setEditFolder(false);
    };

    // when 'enter pressed' create the folder
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            createFolder();
            setFolderInput('');
            setCreatingFolder(false);
        }
    };

    // when right-clicked on the screen, show context menu
    const handleRightClick = (e) => {
        e.preventDefault();
        setPoints({ x: e.pageX, y: e.pageY });
        setClicked(true);
        // fetch folder id
        console.log(document.elementFromPoint(e.pageX, e.pageY).id);
        setFolderId(document.elementFromPoint(e.pageX, e.pageY).id);
    };

    // close the context menu when click
    const closeContextMenu = () => {
        setClicked(false);
    };

    // fetch the folders
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

    // return the folder page UI
    return (
        <div className="folder-page-container">
            <GridLayout {...gridProps}>
                <div key="pet" className="grid-item">
                    <PetIcon name={pet.name} level={pet.level} exp={pet.exp} page="Folder" />
                </div>
                <div key="title" className="grid-item">
                    <h2>TODOGOTCHI</h2>
                </div>
                <div key="buttons" className="grid-item">
                    <div className="button-container">
                        <Button
                            icon={
                                <img
                                    src={add_folder_icon}
                                    alt="Add Folder Icon"
                                    style={{ width: '25px', height: '25px' }}
                                />
                            }
                            onClick={() => {
                                setCreatingFolder(!creatingFolder)
                            }}
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
                        <ProgressBar currentExp={pet.points} level={pet.level} page="Folder" />
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
                    <div onContextMenu={(e) => handleRightClick(e)} key={folder._id}>
                        <Folder
                            key={folder._id}
                            name={folder.name}
                            id={folder._id}
                            notesNumber={folder.notes.length}
                            onClick={() => navigate('/note', { state: folder })}
                            onUpdateFolderName={updateFolder}
                            className="folder-page-folder"
                            editing={folder._id === folderId && editFolder}
                            endEditing={endEditing}
                        />
                    </div>
                ))}
                {creatingFolder && (
                    <div className="folder-container">
                        <div className="left-half">
                            <img src={folder_icon} className="folder-icon" />
                            <input
                                type="text"
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
