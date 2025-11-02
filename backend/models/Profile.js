import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  category: String,
  addedAt: { type: Date, default: Date.now },
});

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  dob: String,
  phone: String,
  location: String,
  foods: [foodSchema],
});

export default mongoose.model("Profile", profileSchema);
