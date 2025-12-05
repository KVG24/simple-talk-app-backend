const { Router } = require("express");
const { validateSignUp } = require("../utils/validation.js");
const authController = require("../controllers/authController.js");
const messageController = require("../controllers/messageController");

const router = Router();

router.post("/sign-up", validateSignUp, authController.registerProfile);
router.post("/log-in", authController.logIn);

router.get("/messages/:receiverId", messageController.getMessagesByReceiverId);
router.get("/messages/:senderId", messageController.getMessagesBySenderId);
router.get(
    "/messages/:senderId/:receiverId",
    messageController.getConversation
);
router.post("/messages/create", messageController.createMessage);
router.put("/messages/:id", messageController.editMessage);
router.delete("/messages/:id", messageController.deleteMessage);

module.exports = router;
