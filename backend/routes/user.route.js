import express from "express";
import { getPasswords, savePassword, deletePassword, edit } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/passwords", getPasswords);

router.post("/savePassword", savePassword);

router.delete("/deletePassword/:id", deletePassword);

router.put("/editPassword/:id", edit);

export default router;