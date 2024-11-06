import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteController.js";
const router = express.Router();

router.post("/:folderId", createNote);
router.get("/:folderId", getNotes);
router.patch(":noteId", updateNote);
router.delete(":/noteId", deleteNote);

export default router;