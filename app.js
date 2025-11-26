import express from "express";
import router from "./routes/router.js";
import cors from "cors";
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

// Live app in localhost
app.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
    console.log("___________________________");
});
