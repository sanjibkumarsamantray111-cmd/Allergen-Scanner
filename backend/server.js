import dotenv from "dotenv";
dotenv.config();

// console.log("ENV TEST:", process.env.RESEND_API_KEY);
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";


// Routes
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";



// --- MONGO CONNECTION ---
mongoose
  .connect(`${process.env.MONGO_URI}`)
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
app.use("/api/password", passwordRoutes);
app.use("/api/contact", contactRoutes);

// ⭐ Route: List available Gemini models
    app.get("/api/models", async (req, res) => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
        );

        const data = await response.json();
        res.json(data);
      } catch (err) {
        console.error("Error listing models:", err);
        res.status(500).json({ error: "Failed to fetch models", details: err });
      }
    });

    // GEMINI AI SETUP
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    let chatHistory = [];

    app.post("/api/ask", async (req, res) => {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ answer: "⚠ Error: No question provided." });
      }

      if (!process.env.GEMINI_API_KEY) {
        console.error("❌ Missing GEMINI_API_KEY");
        return res.status(500).json({
          answer: "⚠ Server error: Gemini API key missing!",
        });
      }

      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash", // current model
          systemInstruction:
            "You are an AI allergen assistant. Answer in 1–2 short, clear sentences focused only on food allergens and safety.",
        });

        const chat = model.startChat({
          history: chatHistory.map((m) => ({
            role: m.sender,
            parts: [{ text: m.text }],
          })),
        });

        chatHistory.push({ sender: "user", text: question });

        // Send just the question; style is controlled by systemInstruction
        const result = await chat.sendMessage(question);

        const answer = result?.response?.text()?.trim() || "(no output)";
        chatHistory.push({ sender: "model", text: answer });

        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

        res.json({ answer });
      } catch (error) {
        console.error("❌ Gemini Error:", error);
        res.status(500).json({
          answer: "⚠ Error: AI could not generate a response. Check server logs.",
        });
      }
    });


    // Chat history view
    app.get("/api/chat-history", (req, res) => {
      res.json(chatHistory);
    });

    // Global error handler
    app.use((err, req, res, next) => {
      console.error("GLOBAL ERROR:", err);
      res.status(500).json({ message: "Something went wrong." });
    });

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));