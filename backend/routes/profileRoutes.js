import express from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   ✅ Add food item to user's profile
   ========================================================= */
router.post("/add-food", protect, async (req, res) => {
  const { name, calories, category } = req.body;

  try {
    // Find or create profile if it doesn’t exist
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      const user = await User.findById(req.userId);
      profile = new Profile({
        userId: user._id,
        fullName: user.name,
        location: "Unknown",
        foods: [],
      });
    }

    // Add new food item
    profile.foods.push({ name, calories, category });
    await profile.save();

    res.status(200).json({
      message: "Food item added to profile successfully",
      profile,
    });
  } catch (error) {
    console.error("❌ Error adding food:", error);
    res.status(500).json({ message: "Error adding food to profile", error });
  }
});

/* =========================================================
   ✅ Fetch the logged-in user's profile (auto-create if missing)
   ========================================================= */
router.get("/me", protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.userId });
    const user = await User.findById(req.userId);

    // If no profile exists, create one automatically
    if (!profile) {
      profile = new Profile({
        userId: user._id,
        fullName: user.name,
        dob: "",
        phone: "",
        location: "Unknown",
        foods: [],
      });
      await profile.save();
      console.log("🆕 New profile created automatically for user:", user._id);
    }

    // ✅ Combine Profile + User allergens into one response
    const fullProfile = {
      ...profile.toObject(),
      allergens: user.allergens || [],
    };

    res.status(200).json(fullProfile);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

/* =========================================================
   ✅ Update profile details
   ========================================================= */
router.put("/update", protect, async (req, res) => {
  try {
    const { fullName, dob, phone, location } = req.body;

    let profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update only provided fields
    if (fullName) profile.fullName = fullName;
    if (dob) profile.dob = dob;
    if (phone) profile.phone = phone;
    if (location) profile.location = location;

    await profile.save();

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
});

/* =========================================================
   ✅ Add allergen to User model
   ========================================================= */
router.put("/add-allergen", protect, async (req, res) => {
  try {
    const { allergen } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize allergens if missing
    if (!user.allergens) user.allergens = [];

    // Prevent duplicates
    if (!user.allergens.includes(allergen)) {
      user.allergens.push(allergen);
    }

    await user.save();
    res.status(200).json({
      message: "✅ Allergen added successfully",
      allergens: user.allergens,
    });
  } catch (err) {
    console.error("❌ Error adding allergen:", err);
    res.status(500).json({ message: "Server error adding allergen" });
  }
});

export default router;
