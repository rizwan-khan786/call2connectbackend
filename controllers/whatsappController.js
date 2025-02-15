// const axios = require("axios");


// exports.sendWhatsAppMessage = async (req, res) => {
//     try {
//         const { number, message, media_url, filename } = req.body;
//         const instance_id = "67B01E4876E9B";
//         const access_token = "677256b0e619e";

//         if (!number || !message) {
//             return res.status(400).json({ error: "Number and message are required" });
//         }

//         const whatsappUrl = `https://whatsapp.digisoftwebsolution.in/api/send`;

//         const response = await axios.get(whatsappUrl, {
//             params: {
//                 number,
//                 type: "media",
//                 message,
//                 media_url,
//                 filename,
//                 instance_id,
//                 access_token
//             }
//         });

//         console.log("API Response:", response.data); // ✅ Log API response to check for errors

//         res.status(200).json({
//             success: true,
//             message: "WhatsApp message sent successfully",
//             apiResponse: response.data // ✅ Send back full API response for debugging
//         });
//     } catch (error) {
//         console.error("WhatsApp API Error:", error?.response?.data || error.message);
//         res.status(500).json({ error: "Internal Server Error", details: error?.response?.data });
//     }
// };



const axios = require("axios");

exports.sendWhatsAppMessage = async (req, res) => {
    try {
        const { number, message, media_url, filename } = req.body;
        const instance_id = "67B01E4876E9B";
        const access_token = "677256b0e619e";

        if (!number || !message) {
            return res.status(400).json({ error: "Number and message are required" });
        }

        const whatsappUrl = `https://whatsapp.digisoftwebsolution.in/api/send`;

        const params = {
            number,
            type: "media",
            message: encodeURIComponent(message), // Encode special characters
            media_url: encodeURIComponent(media_url),
            filename: encodeURIComponent(filename),
            instance_id,
            access_token
        };
        

        console.log("Sending WhatsApp message with URL:", whatsappUrl, "Params:", params);

        const response = await axios.get(whatsappUrl, { params });

        console.log("API Response:", response.data);

        res.status(200).json({
            success: true,
            message: "WhatsApp message sent successfully",
            apiResponse: response.data
        });
    } catch (error) {
        console.error("WhatsApp API Error:", error?.response?.data || error.message);
        res.status(500).json({
            error: "Internal Server Error",
            details: error?.response?.data || error.message
        });
    }
};
