require("dotenv").config();
const chatbotRoutes = require("./routes/chatbot");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Job Placement Chatbot backend is working!"
    });
});
app.use("/api",chatbotRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});