// import Scan from "../models/Scan.js";

// // ✅ Get all scans
// export const getAllScans = async (req, res) => {
//   try {
//     const scans = await Scan.find().sort({ dateTime: -1 });
//     res.status(200).json(scans);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching scans", error });
//   }
// };

// // ✅ Add a new scan
// export const addScan = async (req, res) => {
//   try {
//     const { foodItem, allergens, safetyStatus, safetyPercent } = req.body;

//     const newScan = new Scan({
//       foodItem,
//       allergens,
//       safetyStatus,
//       safetyPercent,
//     });

//     await newScan.save();
//     res.status(201).json({ message: "Scan added successfully", newScan });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding scan", error });
//   }
// };

// // ✅ Get summary data
// export const getSummary = async (req, res) => {
//   try {
//     const totalScans = await Scan.countDocuments();
//     const allScans = await Scan.find();

//     const allergensDetected = allScans.reduce(
//       (count, scan) => count + (scan.allergens.length > 0 ? 1 : 0),
//       0
//     );

//     const safeFoods = totalScans
//       ? Math.round(
//           (allScans.filter((s) => s.safetyStatus === "Safe").length /
//             totalScans) *
//             100
//         )
//       : 0;

//     const riskAlerts = allScans.filter(
//       (s) => s.safetyStatus === "Unsafe"
//     ).length;

//     res.status(200).json({
//       totalScans,
//       allergensDetected,
//       safeFoods,
//       riskAlerts,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching summary", error });
//   }
// };

// controllers/scanController.js
import axios from "axios";
import multer from "multer";
import Preference from "../models/Preferences.js";

// Multer setup for image upload
const storage = multer.memoryStorage();
export const uploadImage = multer({ storage }).single("image");

// POST /api/scan
export const quickScan = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const userId = req.user._id || req.user.id;

    // 1️⃣ Get user allergen preferences
    const prefs = await Preference.findOne({ user: userId });
    const userAllergens = prefs
      ? prefs.allergens.filter(a => a.enabled).map(a => a.name.toLowerCase())
      : [];

    // 2️⃣ Send image to external scan API
    const scanApiUrl =
      process.env.SCAN_API_URL || "https://api.example-food-scan.com/v1/scan";
    const scanApiKey =
      process.env.SCAN_API_KEY || req.headers["x-scan-api-key"];

    if (!scanApiKey) {
      return res
        .status(500)
        .json({ message: "Missing scan API key (set env or header)" });
    }

    const FormData = (await import("form-data")).default;
    const form = new FormData();
    form.append("image", req.file.buffer, {
      filename: req.file.originalname || "upload.jpg",
      contentType: req.file.mimetype,
    });

    const headers = {
      ...form.getHeaders(),
      Authorization: `Bearer ${scanApiKey}`, // or "x-api-key": scanApiKey
    };

    const apiResponse = await axios.post(scanApiUrl, form, { headers });
    const data = apiResponse.data;

    // 3️⃣ Parse detected ingredients
    const ingredients =
      data.ingredients ||
      data.results?.ingredients ||
      data.labels ||
      [];

    const detected = ingredients.map((i) => i.toLowerCase().trim());

    // 4️⃣ Match allergens
    const matches = detected.filter((item) =>
      userAllergens.some((alg) => item.includes(alg))
    );

    // 5️⃣ Build response
    res.status(200).json({
      ok: true,
      detected,
      matches,
      message:
        matches.length > 0
          ? "⚠️ Allergen(s) detected!"
          : "✅ Safe — no allergens found",
    });
  } catch (err) {
    console.error("Quick Scan error:", err.message || err);
    res.status(500).json({ message: "Error scanning image" });
  }
};
