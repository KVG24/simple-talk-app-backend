import { Router } from "express";
import validateSignUp from "../utils/validation.js";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/sign-up", validateSignUp, authController.registerProfile);
router.post("/log-in", authController.logIn);

export default router;
