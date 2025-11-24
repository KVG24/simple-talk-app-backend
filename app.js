const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
require("dotenv").config;

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
