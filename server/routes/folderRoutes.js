import express from 'express';
import { createFolder, getFolders, updateFolder, deleteFolder } from "../controllers/folderController.js";

const router = express.Router();

router.post("/:userId", createFolder);
router.get("/:userId", getFolders);
router.patch(":folderId", updateFolder);
router.delete(":/folderId", deleteFolder);

export default router;