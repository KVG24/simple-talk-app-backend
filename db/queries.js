// Prisma Client config
require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// Queries

// Profile queries
async function getProfile(username) {
    return await prisma.profile.findUnique({
        where: {
            username,
        },
    });
}

async function getProfileById(id) {
    return await prisma.profile.findUnique({
        where: {
            id,
        },
    });
}

async function getProfilesByIds(ids) {
    return await prisma.profile.findMany({
        where: {
            id: {
                in: ids,
            },
        },
        select: {
            id: true,
            username: true,
            name: true,
        },
    });
}

async function registerProfile(email, password, name, username) {
    await prisma.profile.create({
        data: {
            email,
            password,
            name,
            username,
        },
    });
}

async function searchProfiles(searchString) {
    return await prisma.profile.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchString,
                        mode: "insensitive",
                    },
                },
                {
                    username: {
                        contains: searchString,
                        mode: "insensitive",
                    },
                },
            ],
        },
        select: {
            id: true,
            username: true,
            name: true,
        },
        take: 10,
    });
}

// Message queries
async function getMessagesByReceiverId(receiverId) {
    return await prisma.message.findMany({
        where: {
            receiverId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

async function getMessagesBySenderId(senderId) {
    return await prisma.message.findMany({
        where: {
            senderId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

async function getMessagePartnersIds(currentUserId) {
    return await prisma.message.findMany({
        where: {
            OR: [{ senderId: currentUserId }, { receiverId: currentUserId }],
        },
        select: {
            senderId: true,
            receiverId: true,
        },
    });
}

async function getConversation(user1Id, user2Id) {
    return await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: user1Id,
                    receiverId: user2Id,
                },
                {
                    senderId: user2Id,
                    receiverId: user1Id,
                },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async function createMessage(text, senderId, receiverId) {
    await prisma.message.create({
        data: {
            text,
            senderId,
            receiverId,
        },
    });
}

async function editMessage(id, text) {
    await prisma.message.update({
        where: {
            id,
        },
        data: {
            text,
        },
    });
}

async function deleteMessage(id) {
    await prisma.message.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    getProfile,
    getProfileById,
    getProfilesByIds,
    registerProfile,
    searchProfiles,
    getMessagesByReceiverId,
    getMessagesBySenderId,
    getMessagePartnersIds,
    getConversation,
    createMessage,
    editMessage,
    deleteMessage,
};
