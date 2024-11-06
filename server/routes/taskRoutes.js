import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/:noteId", createTask);
router.get("/:noteId", getTasks);
router.patch(":taskId", updateTask);
router.delete(":/taskId", deleteTask);

export default router;