const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    number: { type: String, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true },  // ✅ Added email field

}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
