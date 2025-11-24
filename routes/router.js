const { Router } = require("express");
const router = Router();
const db = require("../db/queries");
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = router;
