const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//Connect Database
connectDB();

app.get("/", (req, res) => res.send("App server is running."));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
