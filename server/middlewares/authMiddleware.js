// authMiddleware.js
import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
          const token = req.cookies.authToken; // Assuming JWT token is stored in cookies
          if (!token) {
                    return res.status(401).json({ error: "Unauthorized access. Please log in." });
          }
          try {
                    const decoded = jwt.verify(token, process.env.SECRET_KEY);
                    req.user = decoded;
                    next();
          } catch (error) {
                    res.status(401).json({ error: "Invalid or expired token. Please log in again." });
          }
};

export const userAuth = (req, res, next) => {
          if (!req.user.isUser) {
                    return res.status(401).json({ error: "Unauthorized access. Please log in." });
          }
          next()
}


export const adminAuth = (req, res, next) => {
          if (!req.user.isAdmin) {
                    return res.status(403).json({ message: "Unauthorized access. Admin privileges required." });
          }
          next()
}