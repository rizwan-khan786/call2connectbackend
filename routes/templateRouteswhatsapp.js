const express = require("express");
const { createTemplate, getTemplateById } = require("../controllers/templateControllerwhatsapp");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate-link", authenticate, createTemplate);
router.get("/details/:id", getTemplateById);

module.exports = router;
