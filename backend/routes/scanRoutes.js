import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import Scan from "../models/Scan.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import protect from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const FOOD_SCAN_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const FOOD_SCAN_API_KEY = process.env.FOOD_SCAN_API_KEY;

// ✅ Helper to calculate safety percentage
const calculateSafety = (matched, total) => {
  if (total === 0) return 100;
  const ratio = matched / total;
  return Math.max(0, Math.round((1 - ratio) * 100));
};

// ✅ Simple alternatives (you can expand this)
const ALTERNATIVES = {
  dairy: ["plant-based milk", "soy-free cheese", "coconut milk"],
  gluten: ["gluten-free bread", "rice", "quinoa"],
  peanuts: ["sunflower butter", "almond butter (if safe)"],
  "tree nuts": ["seeds", "sunflower butter"],
  soy: ["pea protein", "lentils"],
  egg: ["flax egg", "applesauce"],
  fish: ["chicken", "tofu (if safe)"],
  shellfish: ["plant protein", "tofu"],
};

// ✅ ROUTE: /api/scan
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

const userAllergens = (user.allergens || []).map((a) => a.toLowerCase().trim()).filter(Boolean);

console.log("🧾 User Allergens from DB:", userAllergens);
    // 🔹 Read and encode the uploaded image
    const imageBase64 = fs.readFileSync(req.file.path, { encoding: "base64" });

    // 🔹 Gemini prompt for better structured output
    const prompt = `
You are a food analysis assistant.
Analyze this food image and provide results in strict JSON format:
{
  "ingredients": [list of visible or likely ingredients],
  "description": "short summary of what food might be"
}
`;

    // 🔹 Call Gemini API
    const apiResponse = await axios.post(
      `${FOOD_SCAN_API_URL}?key=${FOOD_SCAN_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: req.file.mimetype,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiRaw =
      apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("🧠 Gemini Raw Output:", aiRaw);

    // ✅ Try parsing the JSON from AI text safely
    let aiData = {};
    try {
      aiData = JSON.parse(aiRaw.match(/\{[\s\S]*\}/)?.[0] || "{}");
    } catch (e) {
      console.warn("⚠️ AI JSON parse fallback:", e.message);
      aiData = { ingredients: aiRaw.split(",").map((i) => i.trim()) };
    }

    const ingredients = (aiData.ingredients || []).map((i) =>
      i.toLowerCase().trim()
    );

    // ✅ Match allergens
    const detectedAllergens = ingredients.filter((ing) =>
      userAllergens.some(
        (alg) => ing.includes(alg) || alg.includes(ing)
      )
    );

    // ✅ Suggest alternatives
    const alternatives = {};
    detectedAllergens.forEach((alg) => {
      const key = Object.keys(ALTERNATIVES).find(
        (k) => k === alg || alg.includes(k)
      );
      alternatives[alg] = key ? ALTERNATIVES[key] : ["No specific alternatives found"];
    });

    // ✅ Calculate safety percentage
    const safetyPercent = calculateSafety(
      detectedAllergens.length,
      ingredients.length
    );

    const safetyStatus =
      safetyPercent > 90
        ? "Safe"
        : safetyPercent > 70
        ? "Moderate Risk"
        : "High Risk";

    // ✅ Save scan result to DB
    const newScan = new Scan({
      user: userId,
      foodItem: req.file.originalname.split(".")[0],
      ingredients,
      allergens: detectedAllergens,
      safetyStatus,
      safetyPercent,
      imagePath: req.file.path,
    });

    await newScan.save();

    // ✅ Respond with clean structured data
    res.status(200).json({
      message: "✅ Scan completed successfully",
      foodItem: req.file.originalname,
      description: aiData.description || "No description available",
      ingredients,
      detectedAllergens,
      alternatives,
      safetyPercent,
      safetyStatus,
      savedScan: newScan,
    });
  } catch (error) {
    console.error("❌ Error processing scan:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error processing scan",
      error: error.response?.data || error.message,
    });
  } finally {
    // Optional: delete uploaded image after processing
    try {
      fs.unlinkSync(req.file.path);
    } catch {}
  }
});

export default router;
