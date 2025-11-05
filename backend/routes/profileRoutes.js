import express from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   ✅ Add allergen item to user's profile (stores in foods[])
   ========================================================= */
// ✅ Add allergen
// ✅ Add allergen
router.put("/add-allergen", protect, async (req, res) => {
  const { allergen } = req.body;

  if (!allergen) {
    return res.status(400).json({ message: "Allergen is required" });
  }

  try {
    let profile = await Profile.findOne({ userId: req.userId });

    // Create new profile if not found
    if (!profile) {
      const user = await User.findById(req.userId);
      profile = new Profile({
        userId: user._id,
        fullName: user.name || "",
        location: "Unknown",
        foods: [],
      });
    }

    // ✅ Clean malformed entries before pushing new one
    profile.foods = profile.foods.filter(
      (item) => item && typeof item.allergen === "string" && item.allergen.trim() !== ""
    );

    // ✅ Check for duplicates safely
    const alreadyExists = profile.foods.some(
      (item) => item.allergen.toLowerCase() === allergen.toLowerCase()
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Allergen already exists" });
    }

    // ✅ Add new allergen properly
    profile.foods.push({ allergen });

    await profile.save();

    res.status(200).json({
      success: true,
      message: "✅ Allergen added successfully",
      profile,
    });
  } catch (error) {
    console.error("❌ Error adding allergen:", error);
    res.status(500).json({ message: "Error adding allergen", error: error.message });
  }
});




/* =========================================================
   ✅ Fetch logged-in user's profile
   ========================================================= */
router.get("/me", protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.userId });
    const user = await User.findById(req.userId);

    // Auto-create profile if not found
    if (!profile) {
      profile = new Profile({
        userId: user._id,
        fullName: user.name || "",
        dob: "",
        phone: "",
        location: "Unknown",
        foods: [],
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("❌ Error fetching profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
});

/* =========================================================
   ✅ Update profile details
   ========================================================= */
router.put("/update", protect, async (req, res) => {
  try {
    const { fullName, dob, phone, location } = req.body;

    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (fullName) profile.fullName = fullName;
    if (dob) profile.dob = dob;
    if (phone) profile.phone = phone;
    if (location) profile.location = location;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
});

export default router;
