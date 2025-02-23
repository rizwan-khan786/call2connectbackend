const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const templateRoutes = require("./routes/templateRouteswhatsapp");
const whatsappRoutes = require("./routes/whatsappRoutes");
const path = require("path");

const app = express();
const PORT = 8080;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/templates", require("./routes/templateRoutes"));
app.use("/api/template2", templateRoutes);
app.use("/api/whatsapp", whatsappRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
