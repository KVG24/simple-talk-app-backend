const { Router } = require("express");
const passport = require("passport");
const { validateSignUp } = require("../utils/validation.js");
const authController = require("../controllers/authController.js");
const messageController = require("../controllers/messageController");

const router = Router();
const authenticate = passport.authenticate("jwt", { session: false });

router.post("/sign-up", validateSignUp, authController.registerProfile);
router.post("/log-in", authController.logIn);

router.get(
    "/messages/:receiverId",
    authenticate,
    messageController.getMessagesByReceiverId
);
router.get(
    "/messages/:senderId",
    authenticate,
    messageController.getMessagesBySenderId
);
router.get(
    "/messages/:senderId/:receiverId",
    authenticate,
    messageController.getConversation
);
router.post("/messages/create", authenticate, messageController.createMessage);
router.put("/messages/:id", authenticate, messageController.editMessage);
router.delete("/messages/:id", authenticate, messageController.deleteMessage);

module.exports = router;
