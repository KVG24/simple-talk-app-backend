const { Router } = require("express");
const passport = require("passport");
const { validateSignUp } = require("../utils/validation.js");
const authController = require("../controllers/authController.js");
const messageController = require("../controllers/messageController");
const profileController = require("../controllers/profileController.js");

const router = Router();
const authenticate = passport.authenticate("jwt", { session: false });

router.post("/sign-up", validateSignUp, authController.registerProfile);
router.post("/log-in", authController.logIn);

router.get(
    "/messages/received",
    authenticate,
    messageController.getReceivedMessages
);
router.get("/messages/sent", authenticate, messageController.getSentMessages);
router.get(
    "/messages/partners",
    authenticate,
    messageController.getConversationProfiles
);
router.get(
    "/messages/conversationWith/:profileId",
    authenticate,
    messageController.getConversation
);
router.post("/messages/create", authenticate, messageController.createMessage);
router.put("/messages/edit/:id", authenticate, messageController.editMessage);
router.delete(
    "/messages/delete/:id",
    authenticate,
    messageController.deleteMessage
);

router.get("/profiles/search", authenticate, profileController.profilesSearch);

module.exports = router;
