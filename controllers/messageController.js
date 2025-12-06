const db = require("../db/queries");

async function getReceivedMessages(req, res) {
    try {
        const messages = await db.getMessagesByReceiverId(Number(req.user.id));
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching messages" });
    }
}

async function getSentMessages(req, res) {
    try {
        const messages = await db.getMessagesBySenderId(Number(req.user.id));
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching messages" });
    }
}

async function getConversation(req, res) {
    try {
        const conversation = await db.getConversation(
            Number(req.user.id),
            Number(req.params.profileId)
        );
        res.status(200).json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching conversation" });
    }
}

async function createMessage(req, res) {
    try {
        const { text, receiverId } = req.body;
        const newMessage = await db.createMessage(
            text,
            Number(req.user.id),
            Number(receiverId)
        );
        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating message" });
    }
}

async function editMessage(req, res) {
    try {
        const editedMessage = await db.editMessage(
            Number(req.params.id),
            req.body.text
        );
        res.status(200).json(editedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error editing message" });
    }
}

async function deleteMessage(req, res) {
    try {
        const deletedMessage = await db.deleteMessage(Number(req.params.id));
        res.status(200).json(deletedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting message" });
    }
}

module.exports = {
    getReceivedMessages,
    getSentMessages,
    getConversation,
    createMessage,
    editMessage,
    deleteMessage,
};
