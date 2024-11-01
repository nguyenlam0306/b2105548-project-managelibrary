import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bookID: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  publicationYear: { type: Number, required: true },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    required: true,
  },
  author: { type: String, required: true },
  bookStatus: {
    type: String,
    default: "Available",
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "BookCategory",
    },
  ],
  transactions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "BookTransaction",
    },
  ],
});
bookSchema.index({ title: "text" });

export default mongoose.model("Book", BookSchema);