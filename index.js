const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 6000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/templates", require("./routes/templateRoutes"));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
