import { Router } from "express";
import db from "../db/queries.js";
import authController from "../controllers/authController.js";
import messageController from "../controllers/messageController.js";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

export default router;
