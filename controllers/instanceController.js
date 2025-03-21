// const Instance = require("../models/InstanceSchema");

// // Create or update an instance for the logged-in user
// exports.createOrUpdateInstance = async (req, res) => {
//     try {
//         const { instance_id, access_token } = req.body;
//         const userId = req.user.id; // Extract logged-in user's ID from JWT

//         if (!instance_id || !access_token) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if instance already exists for the user
//         let instance = await Instance.findOne({ userId });

//         if (instance) {
//             // Update the existing instance
//             instance.instance_id = instance_id;
//             instance.access_token = access_token;
//             await instance.save();
//             return res.status(200).json({ message: "Instance updated successfully", data: instance });
//         }

//         // Create a new instance
//         instance = new Instance({ userId, instance_id, access_token });
//         await instance.save();

//         res.status(201).json({ message: "Instance created successfully", data: instance });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


const Instance = require("../models/InstanceSchema");

exports.createOrUpdateInstance = async (req, res) => {
    try {
        console.log("Decoded user:", req.user); // Debugging log

        const { instance_id, access_token } = req.body;
        const userId = req.user.userId; // Correctly extract userId

        if (!userId) {
            return res.status(400).json({ message: "User ID missing from token" });
        }

        if (!instance_id || !access_token) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let instance = await Instance.findOne({ userId });

        if (instance) {
            instance.instance_id = instance_id;
            instance.access_token = access_token;
            await instance.save();
            return res.status(200).json({ message: "Instance updated successfully", data: instance });
        }

        instance = new Instance({ userId, instance_id, access_token });
        await instance.save();

        res.status(201).json({ message: "Instance created successfully", data: instance });
    } catch (error) {
        console.error("Error saving instance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Fetch instance for the logged-in user
exports.getUserInstance = async (req, res) => {
    try {
        const userId = req.user.userId; // Correctly extract logged-in user's ID

        if (!userId) {
            return res.status(400).json({ message: "User ID missing from token" });
        }

        const instance = await Instance.findOne({ userId });

        if (!instance) {
            return res.status(404).json({ message: "No instance found for this user" });
        }

        res.status(200).json({ success: true, data: instance });
    } catch (error) {
        console.error("Error fetching user instance:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
