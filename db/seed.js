require("dotenv").config();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function seed() {
    const password = await bcrypt.hash(process.env.USER_PASSWORD, 10);
    try {
        await prisma.profile.create({
            data: {
                email: "kvg@example.com",
                password,
                name: "Vadym Kozynets",
                username: "KVG24",
            },
        });
        await prisma.profile.create({
            data: {
                email: "johndoe@example.com",
                password,
                name: "John Doe",
                username: "john24",
            },
        });
        await prisma.profile.create({
            data: {
                email: "annadoe@example.com",
                password,
                name: "Anna Doe",
                username: "anna95",
            },
        });

        await prisma.message.create({
            data: {
                text: "Hey, how you're doing?",
                senderId: 2,
                receiverId: 3,
            },
        });
        await prisma.message.create({
            data: {
                text: "Let's go out for dinner somewhere tonight.",
                senderId: 2,
                receiverId: 3,
            },
        });
        await prisma.message.create({
            data: {
                text: "Oh, sure, why not?",
                senderId: 3,
                receiverId: 2,
            },
        });
        await prisma.message.create({
            data: {
                text: "Ok, I'll call you when I arrive",
                senderId: 2,
                receiverId: 3,
            },
        });
        await prisma.message.create({
            data: {
                text: "I'll be waiting",
                senderId: 3,
                receiverId: 2,
            },
        });
        console.log("DB seeded successfully");
    } catch (err) {
        console.error(err);
    } finally {
        prisma.$disconnect();
    }
}

seed();
