import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Profile from "../models/Profile.js";
import sendEmail from "../utils/sendEmail.js";

const JWT_SECRET = "my_default_secret";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const newProfile = new Profile({
      userId: user._id,
      fullName: name,
      dob: "",
      phone: "",
      location: "Unknown",
      foods: [],
    });
    await newProfile.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Respond immediately
    res.status(200).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

    // Send welcome email asynchronously
    setImmediate(() => {
      sendEmail(
        user.email,
        "Welcome to Allergen Scanner",
        `Hello ${user.name || "User"},\n\nYour account has been created successfully.\n\n– Allergen Scanner Team`
      );
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Respond immediately
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

    // Send login notification asynchronously
    setImmediate(() => {
      sendEmail(
        user.email,
        "Login Notification",
        `Hello ${user.name || "User"},\n\nYou just logged into your account.\nIf this wasn’t you, please reset your password immediately.\n\n– Allergen Scanner Team`
      );
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
