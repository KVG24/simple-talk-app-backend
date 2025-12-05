const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/queries");

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
        const registeredUser = await db.getProfile(username);
        if (registeredUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Register user
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.registerProfile(email, hashedPassword, name, username);

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
        const user = await db.getProfile(username);

        if (!user) {
            return res
                .status(401)
                .json({ message: "Incorrect username or password" });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

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

module.exports = {
    registerProfile,
    logIn,
};
