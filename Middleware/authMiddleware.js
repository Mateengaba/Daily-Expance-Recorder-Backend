import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Environment variables load karta hai

const authMiddleware = (req, res, next) => {
    // Token header mein authorization se nikaale
    const token = req.headers.authorization?.split(" ")[1];  // Token ko authorization header se nikaalna
    
    if (!token) {
        return res.status(401).json({ message: "Authentication failed!" });  // Agar token nahi milta
    }

    try {
        // Token verify karein (PRIVATEKEY ko apne environment ya config mein store karen)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        
        // Decoded token mein se userId nikaal kar request mein add kar dein
        req.userId = decodedToken.userId;
        next(); // Agle middleware ya route handler ko call karein
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};

export default authMiddleware;
