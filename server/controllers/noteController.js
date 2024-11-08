import Note from "../models/Note.js";
import Folder from "../models/Folder.js";

// desc: create a new note
// route: POST /notes/:folderId
// access: private (TODO)
export const createNote = async (req, res) => {
    try {
        const { folderId } = req.params;
        const { name } = req.body;

        // confirm data
        if (!folderId || !name) {
            res.status(400).json({ message: "Required fields missing" });
        }

        // check if folder exists
        const folder = await Folder.findById(folderId).exec();
        if (!folder) {
            res.status(404).json({ message: "Folder not found" });
        }

        // create new note
        const note = new Note({
            folder: folderId, 
            name,
            tasks: [], // all created notes start empty
        })

        // store new note
        const savedNote = await note.save();
        
        folder.notes.push(note._id);
        await folder.save();

        // send back new note
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: get all notes associated with folder
// route: GET /notes/:folderId
// access: private (TODO)
export const getNotes = async (req, res) => {
    try {
        const { folderId } = req.params;

        // confirm data
        if (!folderId) {
            return res.status(400).json({ message: "Folder ID required" });
        }

        // check if folder exists
        const folder = await Folder.findById(folderId).populate("notes").exec();
        if (!folder) {
            return res.status(404).json({ message: "Folder not found"});
        }

        // send back list of notes
        res.status(200).json(folder.notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: update a note
// route: PATCH /notes/:noteId
// access: private (TODO)
export const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { name } = req.body;

        // confirm data
        if (!noteId || !name) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // check if note exists
        const note = await Note.findById(noteId).exec();
        if (!note) {
            return res.status(404).json({ message: "Note not found"});
        }

        // update note
        note.name = name;
        await note.save();

        // send back the updated note
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: delete a note
// route: DELETE /notes/:noteId
// access: private (TODO)
export const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params

        // confirm data
        if (!noteId) {
            return res.status(400).json({ message: "Note ID required" });
        }

        // check if note exists
        const note = await Note.findById(noteId).exec();
        if (!note) {
            res.status(404).json({ message: "Note not found"});
        }

        // delete note -- triggers pre-delete hook
        await note.deleteOne();

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.messge });
    }
}