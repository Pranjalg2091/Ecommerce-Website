import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

const protect = async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
        token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = await userSchema.findById(decoded.user.userId).select("-password");
        next();

    } catch (error) {
        console.error("Token verification failed:", error);
        response.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    response.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware to check for admin role
const admin = (request, response, next) => {
  if (request.user && request.user.role === "admin") {
    next(); 
    } else {    
    response.status(403).json({ message: "Not authorized as an admin" });
    }
};

export { protect, admin };
