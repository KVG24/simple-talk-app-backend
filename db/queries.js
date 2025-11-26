import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProfile(username) {
    return await prisma.profile.findFirst({
        where: {
            username,
        },
    });
}

export async function getProfileById(id) {
    return await prisma.profile.findFirst({
        where: {
            id,
        },
    });
}

export async function registerProfile(email, password, name, username) {
    await prisma.profile.create({
        data: {
            email,
            password,
            name,
            username,
        },
    });
}

export default {
    getProfile,
    getProfileById,
    registerProfile,
};
