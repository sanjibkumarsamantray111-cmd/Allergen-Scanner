import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import { forgotPassword, resetPassword } from "../controller/passwordController.js"; // ✅ new
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Existing routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 New Forgot & Reset password routes
router.post("/forgot-password", forgotPassword);   // ✅ for requesting reset link
router.post("/reset-password/:token", resetPassword); // ✅ for resetting password

// router.get("/me", protect, getMe);

export default router;
