import express from "express";
import { register, login } from "../controllers/auth.js";

// will allow express to know that all these routes are all togther
const router = express.Router();

// router.post("/login", login); // this is actually "/auth/login"
router.post("/register", register);

export default router;
