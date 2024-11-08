import express from "express";
import { createPet, getPet, updatePet } from "../controllers/petController.js";

const router = express.Router();

router.post("/:userId", createPet);
router.get("/:petId", getPet);
router.patch("/:petId", updatePet);

export default router;
