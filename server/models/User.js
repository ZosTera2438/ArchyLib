import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // User's cart
});

export default mongoose.model("User", userSchema);
