// const express = require("express");
// const { uploadImage,upload } = require("../controllers/whatsappController"); // ✅ Ensure correct file name
// const router = express.Router();

// router.post("/send",upload,uploadImage); // ✅ Ensure function is defined

// module.exports = router;

const express = require("express");
const { uploadMessage, upload,getAllMessages } = require("../controllers/messageController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect route with authMiddleware
router.post("/upload", upload, uploadMessage);
router.get("/messages", getAllMessages);


module.exports = router;

