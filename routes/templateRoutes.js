const express = require("express");
const { getTemplates, addTemplate, deleteTemplate } = require("../controllers/templatecontrollers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTemplates);
router.post("/add", authMiddleware, addTemplate);
router.delete("/:id", authMiddleware, deleteTemplate);

module.exports = router;
