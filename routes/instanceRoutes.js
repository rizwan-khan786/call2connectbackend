const express = require("express");
const router = express.Router();
const instanceController = require("../controllers/instanceController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to create or update an instance (requires login)
router.post("/instance", authMiddleware, instanceController.createOrUpdateInstance);

// Route to get the instance for the logged-in user (requires login)
router.get("/instance", authMiddleware, instanceController.getUserInstance);

module.exports = router;
