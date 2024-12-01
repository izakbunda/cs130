// import native stuff
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GridLayout from 'react-grid-layout';

// import our components
import Note from '../components/note';
import Button from '../components/button';
import Folder from '../components/folder';
import PetIcon from '../components/pet';
import ContextMenu from '../components/contextMenu';
import ProgressBar from '../components/progress-bar';

// import styling sheets
import '../css/index.css';
import '../css/folder.css';
import '../css/folder-grid.css';

// import custom icons
import add_notes_icon from '../assets/add_notes_icon.svg';
import home_icon from '../assets/home_icon.svg';
import add_icon from '../assets/add_icon.svg';

function NotePage() {
    const navigate = useNavigate();
    const location = useLocation(); // to get folder name
    const folder = location.state;
    // local states
    const [creatingNote, setCreatingNote] = useState(false);
    const [editingNote, setEditingNote] = useState(false);
    const [noteInput, setNoteInput] = useState('');
    const [notes, setNotes] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [taskUpdate, setTaskUpdate] = useState(false);
    const [currentTask, setCurrentTask] = useState('');

    // local states to pass into Note component
    const [editingTask, setEditingTask] = useState(false);
    const [editingDate, setEditingDate] = useState(false);
    const [editingCategory, setEditingCategory] = useState(false);
    const [deletingTask, setDeletingTask] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [elementId, setElementId] = useState('');

    // currently unused (may readd later)
    const [changeInPoints, setChangeInPoints] = useState(0);

    // need to handle the actions for each option of the right-click context menu
    const options = [
        {
            label: 'Edit Note Name',
            action: () => setEditingNote(true)
        },
        {
            label: 'Edit Task Name',
            action: () => setEditingTask(true)
        },
        {
            label: 'Edit Due Date',
            action: () => setEditingDate(true)
        },
        {
            label: 'Edit Category',
            action: () => setEditingCategory(true)
        },
        {
            label: 'Delete Task',
            action: () => {
                setDeletingTask(true);
                deleteTask(elementId);
            }
        }
    ];

    // pet info
    const [pet, setPet] = useState({
        name: 'placeholder',
        level: 0, // Example starting level
        points: 0 // Example starting EXP
    });

    // layout for styling
    const layoutFolder = [
        { i: 'pet', x: 0, y: 0, w: 4, h: 2, static: true },
        { i: 'title', x: 4, y: 0, w: 8, h: 1, static: true },
        { i: 'buttons', x: 12, y: 0, w: 4, h: 1, static: true },
        { i: 'progress', x: 4, y: 1, w: 12, h: 1, static: true }
    ];
    const gridProps = {
        className: 'folder-grid',
        layout: layoutFolder,
        cols: 16,
        rowHeight: 40,
        width: 406
    };

    // FETCH PET FROM BACKEND -- TRIGGER AT PAGE LOAD + ANYTIME A TASK IS CHECKED OFF
    useEffect(() => {
        console.log('updating the stupid progress bar because of taskupdate: ', taskUpdate, currentTask)
        const fetchPet = async (petId) => {
            try {
                const response = await fetch(`http://localhost:3001/pets/${petId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const petData = await response.json();
                // console.log('Fetched pet from backend:', petData)
                // Save pet to localStorage for future use
                localStorage.setItem('pet', JSON.stringify(petData));
                // Update state
                setPet(petData);
            } catch (error) {
                console.error('Failed to fetch pet:', error);
            }
        }

        const pet = localStorage.getItem('pet');
        // console.log('Fetching pet from backend: ', pet)

        // if (!pet) {
        const pet_id = localStorage.getItem('pet_id');
        // Fetch pet from backend if not in localStorage
        fetchPet(pet_id);
        // } else {
        //   console.log('Pet found in localStorage:', JSON.parse(pet))
        //   setPet(JSON.parse(pet))
        // }
    }, [navigate, taskUpdate]);

    // GET all notes from server
    const fetchNotes = async () => {
        try {
            const folderId = folder._id;
            const resp = await fetch(`http://localhost:3001/notes/${folderId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const data = await resp.json();
            setNotes(data);
        } catch (error) {
            alert('Failed to fetch notes, please try again.');
            console.error('Error fetching notes:', error);
        }
    };

    // POST a note to the server
    const createNote = async () => {
        if (!noteInput.trim()) {
            alert('Note name cannot be empty.');
            return;
        }

        try {
            const folderId = folder._id;
            const resp = await fetch(`http://localhost:3001/notes/${folderId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: noteInput })
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const newNote = await resp.json();
            console.log(newNote);

            // update notes
            setNotes((prevNotes) => [...prevNotes, newNote]);
        } catch (error) {
            alert('Failed to create note. Please try again.');
            console.error('Error creating note:', error);
        }
    };

    // DELETE specific note from server
    const deleteNote = async (noteId) => {
        try {
            const resp = await fetch(`http://localhost:3001/notes/${noteId}`, {
                method: 'DELETE'
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            // remove note from local state
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        } catch (error) {
            alert('Failed to delete note, please try again.');
            console.error('Failed to delete note:', error);
        }
    };

    // UPDATE specific note on server
    const updateNote = async (noteId, noteName) => {
        try {
            const resp = await fetch(`http://localhost:3001/notes/${noteId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: noteName })
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }
        } catch (error) {
            alert('Failed to update note, please try again.');
            console.error('Faild to update note:', error);
        }
    };

    // DELETE specific task from server
    const deleteTask = async (taskId) => {
        try {
            const resp = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            // remove task from local state
            // setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

            setDeletingTask(false);
        } catch (error) {
            alert('Failed to delete task, please try again later');
            console.error('Error deleting task:', error);
        }
    };

    // when user presses "enter", create the note
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            createNote()
            setNoteInput('')
            setCreatingNote(false)
        }
    };

    // when user right clicks on note, open up context menu
    const handleRightClick = (e) => {
        endEditing();
        e.preventDefault();
        setPoints({ x: e.pageX, y: e.pageY });
        setClicked(true);
        //console.log('right click: ', document.elementFromPoint(e.pageX, e.pageY).id)
        setElementId(document.elementFromPoint(e.pageX, e.pageY).id);
    };

    // when user is done editing, reset all editing status
    const endEditing = () => {
        setEditingNote(false);
        setEditingTask(false);
        setEditingDate(false);
        setEditingCategory(false);
    };

    // close the context menu
    const closeContextMenu = () => {
        setClicked(false);
    };

    // fetch the notes
    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            setClicked(false)
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    // mark tasks as complete and update xp bar
    const onCheckboxChange = (checked, id) => {
        // console.log('In note-page: checkbox state from child:', checked)
        setCurrentTask(id);
        setTaskUpdate(!taskUpdate);

        const updateTask = async () => {
            let changeInPoints = 0;
            try {
                const resp = await fetch(`http://localhost:3001/tasks/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: checked ? 'completed' : 'pending' }) // Use `checked`
                });

                const task = await resp.json();

                // positive or negative points based on checked status
                changeInPoints = checked === true ? task.points : -task.points

                // Update pet points using the calculated change
                await updatePet(changeInPoints);
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        }

        updateTask();

        // STEP 2: UPDATE PET -> pet.points
        const updatePet = async (pointsToAdd) => {
            try {
                // FIRST GET THE PET
                const pet_id = localStorage.getItem('pet_id');

                // UPDATE POINTS ON BACKEND
                const updateResp = await fetch(`http://localhost:3001/pets/${pet_id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ points: pointsToAdd })
                });

                if (!updateResp.ok) {
                    throw new Error(`Error updating pet: ${updateResp.status} ${updateResp.statusText}`);
                }

                // NOW WE WANT TO UPDATE THE PET IN ORDER TO RE-RENDER THE PROGRESS BAR

                // GET THE UPDATED PET WITH THE UPDATED CALCULATIONS OF POINTS AND LEVEL
                const fetchPetResp = await fetch(`http://localhost:3001/pets/${pet_id}`);

                if (!fetchPetResp.ok) {
                    throw new Error(
                        `Error fetching updated pet: ${fetchPetResp.status} ${fetchPetResp.statusText}`
                    );
                }

                const updatedPetData = await fetchPetResp.json();

                // UPDATE PET STATE WITH UPDATED POINTS AND LEVEL -> THIS WILL TRIGGER RE-RENDER OF PROGRESS BAR
                setPet((prevPet) => ({
                    ...prevPet,
                    points: updatedPetData.points,
                    level: updatedPetData.level
                }));

                if (!updateResp.ok) {
                    throw new Error(`Error: ${updateResp.status} ${updateResp.statusText}`);
                } else {
                    // console.log('yay update the pet status after task completion')
                }
            } catch (error) {
                // alert('Failed to update pet, please try again.')
                console.error('Faild to update pet:', error);
            }
        };
    };

    // return page UI
    return (
        <div className="folder-page-container">
        <GridLayout {...gridProps}>
            <div key="pet" className="grid-item">
            <PetIcon name={pet.name} level={pet.level} exp={pet.points} page="Folder" />
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
            <ProgressBar currentExp={pet.points} level={pet.level} page="Folder" />
            </div>
        </GridLayout>
        <Folder name={folder.name} onClick={() => navigate('/folder')} className="note-page-folder" />
        <div className="notes-list">
            {clicked && notes.some(note => note._id === elementId) && (
            <ContextMenu
                left={points.x}
                top={points.y}
                options={[options[0]]}
                onClose={closeContextMenu}
            />
            )
            }
            {clicked && (!notes.some(note => note._id === elementId)) && (
            <ContextMenu
                left={points.x}
                top={points.y}
                options={options.slice(1, options.length)}
                onClose={closeContextMenu}
            />
            )
            }
            {notes.map((note) => (
            <div onContextMenu={(e) => handleRightClick(e, 'task')} key={note._id}>

                <Note
                key={note._id}
                id={elementId}
                name={note.name}
                noteId={note._id}
                onDelete={deleteNote}
                editingNote={note._id === elementId && editingNote ? true : false}
                onUpdateNoteName={updateNote}
                editingTask={editingTask}
                editingDate={editingDate}
                deletingTask={deletingTask}
                editingCategory={editingCategory}
                endEditing={endEditing}
                points={points}
                onClick={deleteNote}
                onCheckboxChange={onCheckboxChange}

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
                    autoFocus
                />
                </div>
            </div>
            )}
        </div>
        </div>
    )
};

export default NotePage;
