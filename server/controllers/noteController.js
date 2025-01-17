import Note from "../models/Note.js";
import Folder from "../models/Folder.js";

/**
 * Create a new note within a specified folder.
 * Validates the folder and note data, creates a note, associates it with the folder,
 * and returns the created note.
 *
 * @async
 * @function createNote
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.folderId - The folder's ID.
 * @param {Object} req.body - The body of the request containing note data.
 * @param {string} req.body.name - The name of the note to create.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the newly created note.
 * @throws {Object} Sends a JSON response with appropriate error messages.
 */
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
    });

    // store new note
    const savedNote = await note.save();

    folder.notes.push(note._id);
    await folder.save();

    // send back new note
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve all notes associated with a specific folder.
 * Validates the folder ID, fetches its notes, and returns the list.
 *
 * @async
 * @function getNotes
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.folderId - The folder's ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the list of notes.
 * @throws {Object} Sends a JSON response with appropriate error messages.
 */
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
      return res.status(404).json({ message: "Folder not found" });
    }

    // send back list of notes
    res.status(200).json(folder.notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update the details of a specific note.
 * Validates the note ID and name, updates the note, and returns the updated note.
 *
 * @async
 * @function updateNote
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.noteId - The note's ID.
 * @param {Object} req.body - The body of the request containing updated data.
 * @param {string} req.body.name - The updated name of the note.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the updated note.
 * @throws {Object} Sends a JSON response with appropriate error messages.
 */
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
      return res.status(404).json({ message: "Note not found" });
    }

    // update note
    note.name = name;
    await note.save();

    // send back the updated note
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a specific note.
 * Validates the note ID, deletes the note, and sends a success response.
 *
 * @async
 * @function deleteNote
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.noteId - The note's ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with a success status.
 * @throws {Object} Sends a JSON response with appropriate error messages.
 */
export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    // confirm data
    if (!noteId) {
      return res.status(400).json({ message: "Note ID required" });
    }

    // check if note exists
    const note = await Note.findById(noteId).exec();
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    }

    // delete note -- triggers pre-delete hook
    await note.deleteOne();

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.messge });
  }
};
