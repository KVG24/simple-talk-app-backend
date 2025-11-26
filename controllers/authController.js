import { validationResult } from "express-validator";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    getProfile,
    registerProfile as dbRegisterProfile,
} from "../db/queries.js";

const JWT_SECRET = process.env.JWT_SECRET;

async function registerProfile(req, res, next) {
    try {
        const { email, password, name, username } = req.body;

        // Validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if username is taken
        const registeredUser = await getProfile(username);
        if (registeredUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Register user
        const hashedPassword = await hash(password, 10);
        await dbRegisterProfile(email, hashedPassword, name, username);

        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Internal server error during registration." });
    }
}

async function logIn(req, res, next) {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await getProfile(username);

        if (!user) {
            return res
                .status(401)
                .json({ message: "Incorrect username or password" });
        }

        // Compare passwords
        const match = await compare(password, user.password);

        if (!match) {
            return res
                .status(401)
                .json({ message: "Incorrect username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
            expiresIn: "1d",
        });

        // Send token back to client
        return res.status(200).json({
            message: "Login successful",
            token: token,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Internal server error during login." });
    }
}

export default {
    registerProfile,
    logIn,
};
