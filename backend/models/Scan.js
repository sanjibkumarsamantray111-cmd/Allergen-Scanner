// backend/models/Scan.js
import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    foodItem: String,
    allergens: [String],
    safetyStatus: String,
    safetyPercent: Number,
    imagePath: String, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
