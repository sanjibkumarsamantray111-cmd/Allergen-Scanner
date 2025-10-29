import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getUserDashboard, getDashboardStats } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/user", protect,getUserDashboard);
router.get("/stats", protect ,getDashboardStats);

export default router;