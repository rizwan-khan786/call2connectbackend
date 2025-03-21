const mongoose = require("mongoose");

const InstanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    instance_id: { type: String, required: true },
    access_token: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Instance", InstanceSchema);
