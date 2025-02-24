const Template = require("../models/Templatewhatsapp");
const generateCustomLink = require("../utils/generateLink");


exports.createTemplate = async (req, res) => {
    try {
        // Ensure token is valid before proceeding
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Token is missing or invalid" });
        }

        const { name, organization, role, location, email, phone } = req.body;

        // Generate custom link
        const customLink = generateCustomLink(new Date().getTime());

        // Create new template using token information
        const template = new Template({
            tokenData: req.user, // Save token data instead of userId
            name,
            organization,
            role,
            location,
            email,
            phone,
            customLink,
        });

        // Save to MongoDB
        await template.save();

        res.status(201).json({ message: "Nice to talk with you. Thanks for connecting to cvh (fgg)", link: customLink });
    } catch (error) {
        console.error("Error generating custom link:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






exports.getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send("<h2>Missing ID in URL</h2>");
        }

        const template = await Template.findOne({ customLink: new RegExp(id + "$") });

        if (!template) {
            return res.status(404).send("<h2>Details not found</h2>");
        }

        // Generate dynamic HTML response based on API data
        const htmlResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${template.name} - Profile Card</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .card {
                        background: linear-gradient(135deg, #ffedbc, #ed4264);
                        width: 90%;
                        max-width: 450px;
                        padding: 30px;
                        border-radius: 15px;
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                        text-align: center;
                        color: #333;
                    }
                    .card h2 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 8px;
                    }
                    .card p {
                        font-size: 18px;
                        margin: 8px 0;
                    }
                    .buttons {
                        margin-top: 20px;
                    }
                    .btn {
                        display: inline-block;
                        background: #333;
                        color: white;
                        padding: 12px 18px;
                        border-radius: 6px;
                        text-decoration: none;
                        margin: 5px;
                        font-size: 16px;
                    }
                    .btn.whatsapp {
                        background: #25D366;
                    }
                    .btn.share {
                        background: #007bff;
                    }
                    .social-icons {
                        margin-top: 20px;
                    }
                    .social-icons a {
                        text-decoration: none;
                        margin: 0 10px;
                        font-size: 20px;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>${template.name} (${template.organization})</h2>
                    <p>${template.role}</p>
                    <p><strong>Location:</strong> ${template.location}</p>
                    <p><strong>Email:</strong> <a href="mailto:${template.email}">${template.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${template.phone}">${template.phone}</a></p>
                    
                    <div class="buttons">
                        <a href="tel:${template.phone}" class="btn">Call</a>
                        <a href="https://wa.me/${template.phone}" class="btn whatsapp">WhatsApp</a>
                        <a href="mailto:${template.email}" class="btn">Mail</a>
                    </div>

                    <div class="buttons">
                        <a href="#" class="btn share">Share</a>
                    </div>

                    <div class="social-icons">
                        <a href="#">🔵 Facebook</a>
                        <a href="#">🟣 Instagram</a>
                        <a href="#">🌐 Website</a>
                    </div>
                </div>
            </body>
            </html>
        `;

        res.status(200).send(htmlResponse);
    } catch (error) {
        console.error("Error fetching template:", error);
        res.status(500).send("<h2>Internal Server Error</h2>");
    }
};




exports.getTemplatesByUser = async (req, res) => {
    try {
        // Ensure token is valid
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Token is missing or invalid" });
        }

        // Fetch templates where tokenData matches the logged-in user
        const templates = await Template.find({ "tokenData._id": req.user._id });

        if (templates.length === 0) {
            return res.status(404).json({ message: "No generated links found for this user." });
        }

        res.status(200).json({ templates });
    } catch (error) {
        console.error("Error fetching user templates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
