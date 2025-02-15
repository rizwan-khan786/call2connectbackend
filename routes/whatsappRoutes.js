const express = require("express");
const { sendWhatsAppMessage } = require("../controllers/whatsappController"); // ✅ Ensure correct file name
const router = express.Router();

router.post("/send", sendWhatsAppMessage); // ✅ Ensure function is defined

module.exports = router;
