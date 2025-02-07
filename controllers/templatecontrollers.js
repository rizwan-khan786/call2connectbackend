const Template = require("../models/Template");

// Fetch templates for a user with an optional type filter

exports.getTemplates = async (req, res) => {
    try {
        const { type } = req.query; // Change 'category' to 'type'
        if (!type) return res.status(400).json({ message: "Type is required" });

        const templates = await Template.find({ userId: req.user.userId, type });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: "Error fetching templates", error });
    }
};


// Add a new template with type
exports.addTemplate = async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text || !type) {
            return res.status(400).json({ message: "Template text and type are required" });
        }

        if (!["incoming", "outgoing", "missed"].includes(type)) {
            return res.status(400).json({ message: "Invalid template type" });
        }

        const newTemplate = new Template({ userId: req.user.userId, text, type });
        await newTemplate.save();
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(500).json({ message: "Error adding template", error });
    }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await Template.findOne({ _id: id, userId: req.user.userId });

        if (!template) return res.status(404).json({ message: "Template not found" });

        await template.deleteOne();
        res.json({ message: "Template deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting template", error });
    }
};
