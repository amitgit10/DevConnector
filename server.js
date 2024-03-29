const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

const PORT = process.env.PORT || 5000;

//Connect Database
connectDB();

// Init middleware to parse request body
app.use(express.json({ extended: true }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
