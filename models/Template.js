const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ["incoming", "outgoing", "missed"], required: true }  // Added type field
}, { timestamps: true });

module.exports = mongoose.model("Template", TemplateSchema);
