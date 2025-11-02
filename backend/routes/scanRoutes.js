// // backend/routes/scanRoutes.js
// import express from "express";
// import multer from "multer";
// import Scan from "../models/Scan.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     // ✅ Simulate detection result (replace this with your ML logic later)
//     const foodItem = req.file.originalname.split(".")[0] || "Unknown Food";
//     const allergens = ["Gluten", "Peanut"].slice(0, Math.floor(Math.random() * 3)); // example logic
//     const safetyPercent = Math.floor(Math.random() * 40) + 60;
//     const safetyStatus =
//       safetyPercent > 90
//         ? "Safe"
//         : safetyPercent > 75
//         ? "Moderate"
//         : "Unsafe";

//     // ✅ Save to DB
//     const newScan = new Scan({
//       foodItem,
//       allergens,
//       safetyStatus,
//       safetyPercent,
//     });

//     await newScan.save();

//     res.json({
//       message: "Scan completed and saved",
//       score: safetyPercent,
//       status: safetyStatus,
//       allergens: allergens.map((a) => ({
//         name: a,
//         confidence: Math.floor(Math.random() * 20) + 80,
//       })),
//       savedScan: newScan,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error processing scan" });
//   }
// });

// export default router;
// backend/routes/scanRoutes.js



// import express from "express";
// import multer from "multer";
// import Scan from "../models/Scan.js";
// import  protect  from "../middleware/authMiddleware.js"; 
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();

// // configure Multer: store temp uploads in /uploads
// const upload = multer({ dest: "uploads/" });

// // POST /api/scan
// router.post("/", protect, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     const userId = req.user._id || req.user.id;

//     // --- Simulated Detection Logic (replace later with real API call) ---
//     const foodItem = req.file.originalname.split(".")[0] || "Unknown Food";

//     // Random allergen simulation
//     const possibleAllergens = ["Gluten", "Peanut", "Dairy", "Soy"];
//     const allergens = possibleAllergens
//       .sort(() => 0.5 - Math.random())
//       .slice(0, Math.floor(Math.random() * 3));

//     // Random safety scoring
//     const safetyPercent = Math.floor(Math.random() * 40) + 60; // 60–100%
//     const safetyStatus =
//       safetyPercent > 90
//         ? "Safe"
//         : safetyPercent > 75
//         ? "Moderate"
//         : "Unsafe";

//     // --- Save to DB ---
//     const newScan = new Scan({
//       user: userId,
//       foodItem,
//       allergens,
//       safetyStatus,
//       safetyPercent,
//       imagePath: req.file.path, // optional if you want to store the local path
//     });

//     await newScan.save();

//     // --- Respond to frontend ---
//     res.status(200).json({
//       message: "Scan completed and saved",
//       foodItem,
//       score: safetyPercent,
//       status: safetyStatus,
//       allergens: allergens.map((a) => ({
//         name: a,
//         confidence: Math.floor(Math.random() * 20) + 80, // random confidence %
//       })),
//       savedScan: newScan,
//     });
//   } catch (error) {
//     console.error("Error processing scan:", error);
//     res.status(500).json({ message: "Error processing scan" });
//   }
// });

// export default router;



// backend/routes/scanRoutes.js
// import express from "express";
// import multer from "multer";
// import axios from "axios";
// import dotenv from "dotenv";
// import Scan from "../models/Scan.js";
// import fs from "fs";               // 👈 missing in your snippet (you use fs.createReadStream)
// import FormData from "form-data";
// import protect from "../middleware/authMiddleware.js"; // ✅ if default export

// dotenv.config();

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // --- Replace this with your actual Food Scanning API endpoint ---
// const FOOD_SCAN_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"; // example
// const FOOD_SCAN_API_KEY = process.env.FOOD_SCAN_API_KEY; // store in .env file

// // ✅ POST /api/scan  (Protected route)
// router.post("/", protect, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     const userId = req.user._id || req.user.id;

//     // 🧠 Send the uploaded image to the external food scanning API
//     // (replace this logic with your real API documentation)
//     const formData = new FormData();
//     formData.append("image", fs.createReadStream(req.file.path));

//     const apiResponse = await axios.post(FOOD_SCAN_API_URL, formData, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-goog-api-key": FOOD_SCAN_API_KEY,   // or "Authorization: Bearer ..." depending on API
        
//       },
//     });

//     // The external API should return detected allergens or ingredients
//     const result = apiResponse.data;

//     // 🧩 Extract data depending on the API response structure
//     const detectedAllergens = result.allergens || [];
//     const foodItem = result.foodItem || req.file.originalname.split(".")[0];
//     const safetyPercent = result.safetyPercent || Math.floor(Math.random() * 40) + 60;
//     const safetyStatus =
//       safetyPercent > 90
//         ? "Safe"
//         : safetyPercent > 75
//         ? "Moderate"
//         : "Unsafe";

//     // ✅ Save the scan result in your DB
//     const newScan = new Scan({
//       user: userId,
//       foodItem,
//       allergens: detectedAllergens,
//       safetyStatus,
//       safetyPercent,
//       imagePath: req.file.path,
//     });

//     await newScan.save();

//     // ✅ Send clean JSON back to frontend
//     res.status(200).json({
//       message: "Scan completed successfully",
//       foodItem,
//       safetyPercent,
//       safetyStatus,
//       detectedAllergens,
//       savedScan: newScan,
//     });
//   } catch (error) {
//     console.error("Error processing scan:", error.response?.data || error.message);
//     res.status(500).json({
//       message: "Error processing scan",
//       error: error.response?.data || error.message,
//     });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import Scan from "../models/Scan.js";
import protect from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Helper function to compute safety %
const calculateSafety = (matchedCount, total) => {
  if (matchedCount === 0) return 100;
  const risk = Math.min((matchedCount / total) * 100, 100);
  return Math.max(0, 100 - risk * 1.5);
};

// Gemini API info
const FOOD_SCAN_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const FOOD_SCAN_API_KEY = process.env.FOOD_SCAN_API_KEY; // or FOOD_SCAN_API_KEY

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const userId = req.user._id || req.user.id;

    // Read image and encode as Base64
    const imageBase64 = fs.readFileSync(req.file.path, { encoding: "base64" });

// Call Gemini API (use single request that passes key in the URL)
const apiResponse = await axios.post(
  `${FOOD_SCAN_API_URL}?key=${FOOD_SCAN_API_KEY}`,
  {
    contents: [
      {
        parts: [
          { text: "Identify all visible ingredients or allergens in this food photo." },
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

// 🧠 Debug log to inspect what Gemini returns
console.log("🧠 Gemini API Raw Response:");
console.log(JSON.stringify(apiResponse.data, null, 2));

    // Parse Gemini output
    const aiText =
      apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No allergens detected";

    const detectedAllergens = aiText.split(",").map((a) => a.trim());

    // Random safety % logic (you can refine later)
    const safetyPercent = Math.floor(Math.random() * 40) + 60;
    const safetyStatus =
      safetyPercent > 90
        ? "Safe"
        : safetyPercent > 75
        ? "Moderate"
        : "Unsafe";

    const newScan = new Scan({
      user: userId,
      foodItem: req.file.originalname.split(".")[0],
      allergens: detectedAllergens,
      safetyStatus,
      safetyPercent,
      imagePath: req.file.path,
    });

    await newScan.save();

    res.status(200).json({
      message: "Scan completed successfully",
      foodItem: req.file.originalname,
      safetyPercent,
      safetyStatus,
      detectedAllergens,
      aiText,
      savedScan: newScan,
    });
  } catch (error) {
    console.error("Error processing scan:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error processing scan",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
