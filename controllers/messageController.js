// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure 'uploads' folder exists
// const uploadDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer Storage Setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//         cb(null, uniqueName);
//     }
// });

// const upload = multer({ storage });

// // Upload Image & Return URL
// exports.uploadImage = (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         // Generate Image URL
//         const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

//         res.status(200).json({ message: "Image uploaded successfully!", imageUrl });
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // Multer Middleware
// exports.upload = upload.single("image");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Message = require("../models/Message");

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage }).single("image");

const uploadMessage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { message, number } = req.body;

        if (!message || !number) {
            return res.status(400).json({ message: "Message and number are required" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const newMessage = new Message({ message, number, imageUrl });
        await newMessage.save();

        res.status(200).json({ message: "Message uploaded successfully!", imageUrl });
    } catch (error) {
        console.error("Error uploading message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get All Messages API (GET)
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }); // Fetch all messages in descending order
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    uploadMessage,
    upload,
    getAllMessages
};
