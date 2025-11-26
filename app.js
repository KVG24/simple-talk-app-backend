import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import router from "./routes/router.js";
import db from "./db/queries.js";
import "dotenv/config";

// Initiate main express app
const app = express();

// CORS config
app.use(
    cors({
        origin: process.env.FRONTEND_ORIGIN,
    })
);

// Parsing json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/", router);

// Authentication
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const verify = async (jwt_payload, done) => {
    try {
        const user = await db.getProfileById(jwt_payload.sub);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
};

passport.use(new JwtStrategy(opts, verify));

// Live app in localhost
app.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
    console.log("___________________________");
});
