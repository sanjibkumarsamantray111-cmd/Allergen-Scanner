import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileCreated: { type: Boolean, default: false },
   foodItems: { type: Array, default: [] },

  // 🟢 Add this field
  allergens: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("User", userSchema);