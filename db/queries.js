require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");

const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

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

module.exports = {
    getProfile,
    getProfileById,
    registerProfile,
};
