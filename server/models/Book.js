import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  quantity: { type: Number, required: true },
  borrowed: { type: Number, default: 0 }, // Tracks how many copies are currently borrowed
});

export default mongoose.model("Book", bookSchema);
