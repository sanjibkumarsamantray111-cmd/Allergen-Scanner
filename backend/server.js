import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import profileRoutes from "./routes/profileRoutes.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";

dotenv.config();

// --- MONGO CONNECTION ---
mongoose
  .connect("mongodb+srv://Bandana:hellobandana@cluster0.748vw2c.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

// --- BASIC ROUTE ---
app.get("/", (req, res) => res.send("🌍 API is running..."));

// --- MAIN ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/profile", profileRoutes);


// --- GEMINI AI SETUP ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction =
  "You are an AI allergen assistant that helps users identify food allergens and provide safety advice clearly and accurately.";

// --- AI CHAT ENDPOINT ---
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "⚠ Error: No question provided." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-latest",
      systemInstruction: systemInstruction,
    });

    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(question);

    res.json({ answer: result.response.text().trim() });
  } catch (error) {
    console.error("❌ Gemini error:", error);
    res.status(500).json({ answer: "⚠ Error: Unable to fetch AI response." });
  }
});


// --- MULTER SETUP ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// --- SCAN ENDPOINT ---
app.post("/api/scan", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("📸 Uploaded file:", req.file.filename);

    // Fake allergen detection logic
    const allergens = [
      { name: "Gluten-Free", confidence: Math.floor(Math.random() * 20) + 80 },
      { name: "Dairy-Free", confidence: Math.floor(Math.random() * 20) + 75 },
      { name: "Nut-Free", confidence: Math.floor(Math.random() * 20) + 70 },
    ];

    const avg =
      allergens.reduce((sum, a) => sum + a.confidence, 0) / allergens.length;

    const result = {
      score: avg.toFixed(1),
      status: avg > 90 ? "Safe" : avg > 75 ? "Moderate" : "Risky",
      allergens,
    };

    // Clean up the uploaded file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("❌ Error deleting uploaded file:", err);
    });

    res.json(result);
  } catch (err) {
    console.error("❌ Scan Error:", err);
    res.status(500).json({ error: "Error analyzing image" });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
