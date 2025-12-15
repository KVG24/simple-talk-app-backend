const db = require("../db/queries");

async function getReceivedMessages(req, res) {
    try {
        const messages = await db.getMessagesByReceiverId(Number(req.user.id));
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching received messages" });
    }
}

async function getSentMessages(req, res) {
    try {
        const messages = await db.getMessagesBySenderId(Number(req.user.id));
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching sent messages" });
    }
}

async function getConversationProfiles(req, res) {
    try {
        const currentUserId = Number(req.user.id);
        const messages = await db.getMessagePartnersIds(currentUserId);
        const partnerIDs = new Set();

        // iterate over all messages involving current user
        // and create a set of unique IDs of message partners
        messages.forEach((message) => {
            if (message.senderId === currentUserId) {
                partnerIDs.add(message.receiverId);
            } else if (message.receiverId === currentUserId) {
                partnerIDs.add(message.senderId);
            }
        });
        const uniqueIds = Array.from(partnerIDs);
        // filter in case if user messaged himself
        const finalPartnerIds = uniqueIds.filter((id) => id !== currentUserId);

        if (finalPartnerIds.length === 0) {
            return res.status(200).json([]);
        }
        const partners = await db.getProfilesByIds(finalPartnerIds);
        res.status(200).json({ partners, currentUserId });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching conversation profiles",
        });
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
    getConversationProfiles,
    getConversation,
    createMessage,
    editMessage,
    deleteMessage,
};
