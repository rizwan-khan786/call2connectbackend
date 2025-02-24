const express = require("express");
const { createTemplate, getTemplateById,getTemplatesByUser } = require("../controllers/templateControllerwhatsapp");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate-link", authenticate, createTemplate);
router.get("/details/:id", getTemplateById);
router.get("/my-links", authenticate, getTemplatesByUser);


module.exports = router;
