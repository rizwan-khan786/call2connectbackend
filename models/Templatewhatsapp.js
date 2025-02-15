const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
    name: String,
    organization: String,
    role: String,
    location: String,
    email: String,
    phone: String,
    customLink: String,
    tokenData: Object, // Store token payload if needed
}, { timestamps: true });

module.exports = mongoose.model("Templatewhatsapp", TemplateSchema);
