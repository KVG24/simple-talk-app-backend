const { Router } = require("express");
const { validateSignUp } = require("../utils/validation.js");
const authController = require("../controllers/authController.js");

const router = Router();

router.post("/sign-up", validateSignUp, authController.registerProfile);
router.post("/log-in", authController.logIn);

module.exports = router;
