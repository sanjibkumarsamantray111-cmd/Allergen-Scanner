import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    // Get token from headers (Authorization or token)
    const authHeader = req.headers.authorization || req.headers.token;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token if it starts with "Bearer "
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token using a default secret (since no env variable)
    const decoded = jwt.verify(token, "my_default_secret"); // 🔐 fallback secret

    // Find user from decoded token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next(); // move to next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;
