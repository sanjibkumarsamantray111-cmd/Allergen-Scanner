import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  allergen: { type: String, required: true }, // only allergen, nothing else
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
