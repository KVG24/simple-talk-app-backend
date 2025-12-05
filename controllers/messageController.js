const db = require("../db/queries");

async function getMessagesByReceiverId(req, res) {
    try {
        const messages = await db.getMessagesByReceiverId(
            Number(req.params.receiverId)
        );
        if (!messages) {
            return res.status(400).json({ message: "Messages not found" });
        }
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching messages" });
    }
}

async function getMessagesBySenderId(req, res) {
    try {
        const messages = await db.getMessagesBySenderId(
            Number(req.params.senderId)
        );
        if (!messages) {
            return res.status(400).json({ message: "Messages not found" });
        }
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching messages" });
    }
}

async function getConversation(req, res) {
    try {
        const conversation = await db.getConversation(
            Number(req.params.senderId),
            Number(req.params.receiverId)
        );
        if (!conversation) {
            return res.status(400).json({ message: "Conversation not found" });
        }
        res.status(200).json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching conversation" });
    }
}

async function createMessage(req, res) {
    try {
        const { text, senderId, receiverId } = req.body;
        const newMessage = await db.createMessage(
            text,
            Number(senderId),
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
    getMessagesByReceiverId,
    getMessagesBySenderId,
    getConversation,
    createMessage,
    editMessage,
    deleteMessage,
};
