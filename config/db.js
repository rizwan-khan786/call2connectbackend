const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://rizwanikhan63:root@cluster0.n0mstat.mongodb.net/calltoconnect?retryWrites=true&w=majority&appName=Cluster0"; // Change as needed

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
