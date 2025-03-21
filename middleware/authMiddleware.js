// const jwt = require("jsonwebtoken");

// const SECRET_KEY = "mySecretKey"; 

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey"; // Use a secure environment variable

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);

        // Attach userId to req.user
        req.user = { userId: decoded.userId, email: decoded.email };

        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
